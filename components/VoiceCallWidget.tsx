'use client';

import { useState, useEffect, useRef } from 'react';
import { Phone, PhoneOff, Mic, MicOff, X } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/utils/cn';

// RetellWebClient will be dynamically imported when needed

type CallStatus = 'idle' | 'connecting' | 'connected' | 'ended' | 'error';

interface TranscriptMessage {
  role: 'agent' | 'user';
  content: string;
  timestamp: Date;
}

export default function VoiceCallWidget() {
  const [callStatus, setCallStatus] = useState<CallStatus>('idle');
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<TranscriptMessage[]>([]);
  const [showCallModal, setShowCallModal] = useState(false);
  const [currentAgentText, setCurrentAgentText] = useState('');
  const [currentUserText, setCurrentUserText] = useState('');
  const clientRef = useRef<any>(null);
  const transcriptEndRef = useRef<HTMLDivElement>(null);
  const callIdRef = useRef<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Auto-scroll transcript to bottom when new messages arrive
  useEffect(() => {
    if (transcriptEndRef.current) {
      transcriptEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [transcript, currentAgentText, currentUserText]);

  const startCall = async () => {
    try {
      setError(null);
      setCallStatus('connecting');
      setShowCallModal(true); // Open modal immediately
      setTranscript([]);
      setCurrentAgentText('');
      setCurrentUserText('');

      // Fetch access token from our API
      const response = await fetch('/api/retell-web-call', {
        method: 'POST'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create web call');
      }

      const responseData = await response.json();
      const { access_token, call_id } = responseData;

      if (!access_token) {
        throw new Error('No access token received');
      }

      // Store call_id for later transcript fetching
      console.log('Call ID:', call_id);
      callIdRef.current = call_id;

      // Dynamically import RetellWebClient (only works in browser)
      const { RetellWebClient } = await import('retell-client-js-sdk');

      // Initialize and start the call
      const client = new RetellWebClient();
      clientRef.current = client;

      // Set up event listeners
      client.on('call_ready', () => {
        console.log('🎉 [EVENT] Call ready - WebRTC connection established');
      });

      client.on('call_started', () => {
        console.log('🎉 [EVENT] Call started');
        setCallStatus('connected');
      });

      // Store call_id in a ref so polling can access it
      callIdRef.current = call_id;
      
      // Helper function to process transcript_object array
      const processTranscriptObject = (transcriptObject: any[]) => {
        if (!Array.isArray(transcriptObject)) return;
        
        transcriptObject.forEach((utterance: any, index: number) => {
          console.log(`📝 Processing utterance ${index}:`, utterance);
          
          const role = utterance.role?.toLowerCase() === 'agent' ? 'agent' : 
                      utterance.role?.toLowerCase() === 'user' ? 'user' :
                      utterance.role?.toLowerCase() === 'assistant' ? 'agent' :
                      utterance.speaker?.toLowerCase() === 'agent' ? 'agent' :
                      utterance.speaker?.toLowerCase() === 'user' ? 'user' : null;
          
          const content = utterance.content?.trim() || 
                         utterance.text?.trim() || 
                         utterance.message?.trim() || '';
          
          console.log(`   Role: ${role}, Content: "${content.substring(0, 50)}${content.length > 50 ? '...' : ''}"`);
          
          if (role && content) {
            setTranscript(prev => {
              const exactDuplicate = prev.some(msg => msg.role === role && msg.content === content);
              if (exactDuplicate) {
                console.log('   ⏭ Skipping exact duplicate');
                return prev;
              }
              
              const lastMsg = prev[prev.length - 1];
              
              if (
                lastMsg?.role === role &&
                (content.startsWith(lastMsg.content) || lastMsg.content.startsWith(content))
              ) {
                console.log('   ↻ Updating last message');
                return [...prev.slice(0, -1), { role, content, timestamp: new Date() }];
              }
              
              console.log('   ➕ Adding new message');
              return [
                ...prev,
                { role, content, timestamp: new Date() }
              ];
            });
          } else {
            console.log('   ⚠️ Missing role or content');
          }
        });
      };

      // Helper function to process transcript string
      const processTranscriptString = (transcriptText: string) => {
        if (typeof transcriptText !== 'string') return;
        
        const lines = transcriptText.split('\n').filter(line => line.trim());
        lines.forEach((line: string) => {
          const trimmed = line.trim();
          let role: 'agent' | 'user' | null = null;
          let content = '';
          
          const agentMatch = trimmed.match(/^(Agent|agent|🤖|Assistant|assistant):\s*(.+)/i);
          const userMatch = trimmed.match(/^(User|user|You|you|👤):\s*(.+)/i);
          
          if (agentMatch) {
            role = 'agent';
            content = agentMatch[2].trim();
          } else if (userMatch) {
            role = 'user';
            content = userMatch[2].trim();
          }
          
          if (role && content) {
            setTranscript(prev => {
              const exactDuplicate = prev.some(msg => msg.role === role && msg.content === content);
              if (exactDuplicate) {
                return prev;
              }
              
              const lastMsg = prev[prev.length - 1];
              if (
                lastMsg?.role === role &&
                (content.startsWith(lastMsg.content) || lastMsg.content.startsWith(content))
              ) {
                return [...prev.slice(0, -1), { role, content, timestamp: new Date() }];
              }
              
              return [
                ...prev,
                { role, content, timestamp: new Date() }
              ];
            });
          }
        });
      };
      
      // Set up polling to fetch transcript updates every 3 seconds during the call
      let isCallActive = true;
      let lastTranscriptLength = 0;
      const transcriptPollInterval = setInterval(async () => {
        if (isCallActive && callIdRef.current) {
          try {
            const transcriptResponse = await fetch(`/api/retell-web-call/${callIdRef.current}`);
            if (transcriptResponse.ok) {
              const callData = await transcriptResponse.json();
              
              if (callData.transcript_object && Array.isArray(callData.transcript_object)) {
                if (callData.transcript_object.length > lastTranscriptLength) {
                  console.log('📊 [POLL] New transcript data found via polling:', callData.transcript_object.length, 'utterances');
                  processTranscriptObject(callData.transcript_object);
                  lastTranscriptLength = callData.transcript_object.length;
                }
              } else if (callData.transcript && typeof callData.transcript === 'string') {
                processTranscriptString(callData.transcript);
              }
            }
          } catch (err) {
            console.error('📊 [POLL] Error polling transcript:', err);
          }
        } else {
          clearInterval(transcriptPollInterval);
        }
      }, 3000);
      
      client.on('call_ended', async () => {
        isCallActive = false;
        clearInterval(transcriptPollInterval);
        console.log('📊 [POLL] Polling stopped - call ended');
        
        console.log('🔴 [EVENT] Call ended - fetching final transcript');
        setCallStatus('ended');
        
        if (callIdRef.current) {
          try {
            console.log('📥 Fetching final transcript for call:', callIdRef.current);
            const transcriptResponse = await fetch(`/api/retell-web-call/${callIdRef.current}`);
            if (transcriptResponse.ok) {
              const callData = await transcriptResponse.json();
              console.log('📥 Final call data received:', callData);
              
              if (callData.transcript_object && Array.isArray(callData.transcript_object)) {
                console.log('📥 Processing transcript_object with', callData.transcript_object.length, 'utterances');
                processTranscriptObject(callData.transcript_object);
              }
              
              if (callData.transcript && typeof callData.transcript === 'string') {
                console.log('📥 Processing transcript string');
                processTranscriptString(callData.transcript);
              }
              
              if (callData.transcript_with_tool_calls && Array.isArray(callData.transcript_with_tool_calls)) {
                console.log('📥 Processing transcript_with_tool_calls');
                processTranscriptObject(callData.transcript_with_tool_calls);
              }
            } else {
              const errorText = await transcriptResponse.text();
              console.error('📥 Error fetching transcript:', transcriptResponse.status, errorText);
            }
          } catch (err) {
            console.error('📥 Error fetching final transcript:', err);
          }
        }
        
        clientRef.current = null;
      });

      client.on('error', (error: any) => {
        console.error('Retell call error:', error);
        setError(error?.message || 'Call error occurred');
        setCallStatus('error');
        clientRef.current = null;
        if (transcriptPollInterval) {
          clearInterval(transcriptPollInterval);
        }
      });

      // Handle transcript updates
      client.on('update', (update: any) => {
        console.log('📞 [EVENT] === UPDATE EVENT ===');
        console.log('📞 Full update object:', JSON.stringify(update, null, 2));
        
        if (update.transcript && Array.isArray(update.transcript)) {
          console.log('📞 ✅ transcript array found with', update.transcript.length, 'fragments');
          
          const fragment = update.transcript[update.transcript.length - 1];
          console.log('📞 Latest fragment:', fragment);
          
          if (!fragment) {
            return;
          }
          
          const speaker = fragment.speaker || fragment.role || 'unknown';
          const text = fragment.content || fragment.text || '';
          
          console.log(`📞 Speaker: ${speaker}, Text: "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"`);
          
          if (!speaker || !text) {
            console.log('📞 ⚠️ Missing speaker or text in fragment');
            return;
          }
          
          const role = speaker.toLowerCase() === 'agent' || speaker.toLowerCase() === 'assistant' ? 'agent' : 'user';
          
          setTranscript(prev => {
            const lastIndex = prev.length - 1;
            const lastMsg = lastIndex >= 0 ? prev[lastIndex] : null;
            
            const exactDuplicate = prev.some(msg => msg.role === role && msg.content === text);
            if (exactDuplicate) {
              console.log('📞 ⏭ Skipping exact duplicate message');
              if (role === 'agent') {
                setCurrentAgentText('');
              } else {
                setCurrentUserText('');
              }
              return prev;
            }
            
            if (lastMsg && lastMsg.role === role) {
              if (lastMsg.content === text) {
                console.log('📞 ✅ Message finalized, clearing live indicator');
                if (role === 'agent') {
                  setCurrentAgentText('');
                } else {
                  setCurrentUserText('');
                }
                return prev;
              } else {
                console.log('📞 🔄 Partial update - updating last message');
                const updated = [...prev];
                updated[lastIndex] = { role, content: text, timestamp: new Date() };
                if (role === 'agent') {
                  setCurrentAgentText(text);
                } else {
                  setCurrentUserText(text);
                }
                return updated;
              }
            } else {
              console.log('📞 ➕ Adding new finalized message');
              if (role === 'agent') {
                setCurrentAgentText('');
              } else {
                setCurrentUserText('');
              }
              return [...prev, { role, content: text, timestamp: new Date() }];
            }
          });
        } else if (update.transcript_object && Array.isArray(update.transcript_object)) {
          console.log('📞 ✅ transcript_object found (fallback):', update.transcript_object);
          processTranscriptObject(update.transcript_object);
        } else if (update.transcript && typeof update.transcript === 'string') {
          console.log('📞 ✅ transcript string found (fallback):', update.transcript);
          processTranscriptString(update.transcript);
        }
      });

      client.on('agent_start_talking', () => {
        console.log('🎤 [EVENT] Agent started talking');
      });

      client.on('agent_stop_talking', () => {
        console.log('🎤 [EVENT] Agent stopped talking');
        if (currentAgentText) {
          setTranscript(prev => {
            const exists = prev.some(msg => msg.role === 'agent' && msg.content === currentAgentText);
            if (exists) {
              console.log('🎤 ⏭ Message already in transcript, skipping duplicate');
              return prev;
            }
            
            const lastIndex = prev.length - 1;
            if (lastIndex >= 0 && prev[lastIndex].role === 'agent') {
              if (prev[lastIndex].content !== currentAgentText) {
                const updated = [...prev];
                updated[lastIndex] = { role: 'agent', content: currentAgentText, timestamp: new Date() };
                return updated;
              }
              return prev;
            } else {
              return [...prev, { role: 'agent', content: currentAgentText, timestamp: new Date() }];
            }
          });
          setCurrentAgentText('');
        }
      });

      // Start the call
      await client.startCall({ accessToken: access_token });
    } catch (err: any) {
      console.error('Error starting call:', err);
      setError(err?.message || 'Failed to start call');
      setCallStatus('error');
      clientRef.current = null;
    }
  };

  const endCall = () => {
    if (clientRef.current) {
      try {
        clientRef.current.stopCall();
      } catch (err) {
        console.error('Error ending call:', err);
      }
      clientRef.current = null;
    }
    setCallStatus('ended');
    setIsMuted(false);
    setError(null);
  };

  const closeModal = () => {
    if (callStatus === 'connected' || callStatus === 'connecting') {
      endCall();
    }
    setShowCallModal(false);
    setCallStatus('idle');
    setTranscript([]);
    setCurrentAgentText('');
    setCurrentUserText('');
  };

  const toggleMute = () => {
    if (clientRef.current) {
      try {
        if (isMuted) {
          clientRef.current.unmute();
        } else {
          clientRef.current.mute();
        }
        setIsMuted(!isMuted);
      } catch (err) {
        console.error('Error toggling mute:', err);
      }
    }
  };

  // Don't render on server
  if (!isClient) {
    return null;
  }

  return (
    <>
      {/* Full-Screen Call Modal */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 bg-white dark:bg-zinc-900 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <div className={cn(
                "w-3 h-3 rounded-full",
                callStatus === 'connected' ? "bg-green-500 animate-pulse" :
                callStatus === 'connecting' ? "bg-yellow-500 animate-pulse" :
                "bg-gray-400"
              )}></div>
              <h3 className="font-semibold text-xl text-zinc-900 dark:text-zinc-100">
                {callStatus === 'connecting' ? 'Connecting...' :
                 callStatus === 'connected' ? 'Call Active' :
                 callStatus === 'ended' ? 'Call Ended' :
                 'Voice Call'}
              </h3>
            </div>
            <Button
              onClick={closeModal}
              variant="ghost"
              size="sm"
              className="h-10 w-10 p-0"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>

          {/* Transcript Content - Full Screen */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {transcript.length === 0 && currentAgentText === '' && currentUserText === '' ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 border-4 border-blue-200 dark:border-blue-800 border-t-blue-600 dark:border-t-blue-400 rounded-full animate-spin mb-4"></div>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  {callStatus === 'connecting' ? 'Connecting to agent...' : 'Waiting for conversation to start...'}
                </p>
              </div>
            ) : (
              <>
                {transcript.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex flex-col gap-1',
                      msg.role === 'agent' ? 'items-start' : 'items-end'
                    )}
                  >
                    <div
                      className={cn(
                        'rounded-lg px-4 py-3 max-w-[75%] shadow-sm',
                        msg.role === 'agent'
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-zinc-900 dark:text-zinc-100 border border-blue-200 dark:border-blue-800'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-300 dark:border-zinc-700'
                      )}
                    >
                      <div className="text-xs font-semibold mb-1.5 opacity-80">
                        {msg.role === 'agent' ? '🤖 Agent' : '👤 You'}
                      </div>
                      <div className="text-sm leading-relaxed">{msg.content}</div>
                    </div>
                    <div className="text-xs text-zinc-400 dark:text-zinc-500 px-2">
                      {msg.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                ))}

                {/* Current speaking indicators */}
                {currentAgentText && (() => {
                  const lastAgentMsg = transcript.filter(msg => msg.role === 'agent').pop();
                  if (lastAgentMsg && lastAgentMsg.content === currentAgentText) {
                    return null;
                  }
                  return (
                    <div className="flex flex-col gap-1 items-start">
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg px-4 py-3 max-w-[75%] border-2 border-blue-300 dark:border-blue-700 shadow-sm">
                        <div className="text-xs font-semibold mb-1.5 text-blue-700 dark:text-blue-300 flex items-center gap-2">
                          <span>🤖 Agent</span>
                          <span className="flex gap-1">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                          </span>
                        </div>
                        <div className="text-sm text-zinc-900 dark:text-zinc-100 leading-relaxed">
                          {currentAgentText}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {currentUserText && (() => {
                  const lastUserMsg = transcript.filter(msg => msg.role === 'user').pop();
                  if (lastUserMsg && lastUserMsg.content === currentUserText) {
                    return null;
                  }
                  return (
                    <div className="flex flex-col gap-1 items-end">
                      <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg px-4 py-3 max-w-[75%] border-2 border-zinc-400 dark:border-zinc-600 shadow-sm">
                        <div className="text-xs font-semibold mb-1.5 text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                          <span>👤 You</span>
                          <span className="flex gap-1">
                            <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-pulse"></span>
                            <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                            <span className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
                          </span>
                        </div>
                        <div className="text-sm text-zinc-900 dark:text-zinc-100 leading-relaxed">
                          {currentUserText}
                        </div>
                      </div>
                    </div>
                  );
                })()}

                <div ref={transcriptEndRef} />
              </>
            )}
          </div>

          {/* Call Controls Footer */}
          <div className="border-t border-zinc-200 dark:border-zinc-800 p-6">
            <div className="flex gap-4 justify-center">
              <Button
                onClick={toggleMute}
                variant={isMuted ? "destructive" : "outline"}
                size="lg"
                className="flex-1 max-w-[200px]"
                disabled={callStatus !== 'connected'}
              >
                {isMuted ? (
                  <>
                    <MicOff className="w-5 h-5 mr-2" />
                    Unmute
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5 mr-2" />
                    Mute
                  </>
                )}
              </Button>
              <Button
                onClick={callStatus === 'ended' ? closeModal : endCall}
                variant="destructive"
                size="lg"
                className="flex-1 max-w-[200px]"
                disabled={callStatus !== 'connected' && callStatus !== 'ended'}
              >
                <PhoneOff className="w-5 h-5 mr-2" />
                {callStatus === 'ended' ? 'Close' : 'End Call'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen "Make a Call" Button - Only shown when modal is closed */}
      {!showCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#020b32]">
          <button
            onClick={startCall}
            disabled={callStatus === 'connecting'}
            className={cn(
              'w-full h-full flex flex-col items-center justify-center gap-4 transition-all',
              callStatus === 'connecting'
                ? 'bg-blue-600 hover:bg-blue-700 animate-pulse cursor-wait'
                : callStatus === 'error'
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-[#00a7ff] hover:bg-[#0090d9] cursor-pointer'
            )}
          >
            {callStatus === 'connecting' ? (
              <>
                <div className="w-20 h-20 border-8 border-white border-t-transparent rounded-full animate-spin"></div>
                <span className="text-white text-xl font-semibold">Connecting...</span>
              </>
            ) : callStatus === 'error' ? (
              <>
                <Phone className="w-24 h-24 text-white" />
                <span className="text-white text-xl font-semibold">Call Failed</span>
                {error && <span className="text-white/80 text-sm">{error}</span>}
                <span className="text-white/60 text-sm mt-2">Click to try again</span>
              </>
            ) : callStatus === 'ended' ? (
              <>
                <Phone className="w-24 h-24 text-white" />
                <span className="text-white text-xl font-semibold">Call Ended</span>
                <span className="text-white/60 text-sm mt-2">Click to start a new call</span>
              </>
            ) : (
              <>
                <Phone className="w-24 h-24 text-white" />
                <span className="text-white text-2xl font-bold">Make a Call</span>
                <span className="text-white/80 text-base">Click to start</span>
              </>
            )}
          </button>
        </div>
      )}
    </>
  );
}
