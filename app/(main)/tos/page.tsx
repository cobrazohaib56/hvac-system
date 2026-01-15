const Tos = () => {
  return (
    <div className="py-20 flex justify-center">
      <div className="p-4 max-w-screen-md mx-auto">
        <h1 className="text-2xl font-bold text-center my-4 mb-20">
          Terms of Service
        </h1>
        <p>
          <strong>Effective Date:</strong> [Insert Date]
        </p>
        <p>Welcome to [Website Name]!</p>
        <p>
          By accessing our website ([insert URL]), you agree to these Terms of
          Service (ToS), our Privacy Policy, and any other policies or
          guidelines we may post, which form a legally binding agreement. If you
          do not agree to these terms, please do not use our services.
        </p>

        <h2 className="text-xl font-semibold mt-4">1. Account Registration</h2>
        <p>
          To use certain features of our site, you must register for an account.
          By creating an account, you agree to:
        </p>
        <ul className="list-disc pl-5">
          <li>Provide accurate, current, and complete information.</li>
          <li>
            Maintain the security of your account by not sharing your password.
          </li>
          <li>
            Accept all risks of unauthorized access to your account and the
            information you provide to us.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-4">2. Subscriptions</h2>
        <p>
          Our services include various subscription plans. By subscribing to our
          services, you agree to:
        </p>
        <ul className="list-disc pl-5">
          <li>Pay the applicable subscription fees.</li>
          <li>
            Acknowledge that fees are billed in advance on a recurring basis
            (monthly/yearly) and are non-refundable.
          </li>
          <li>
            Understand that your subscription will automatically renew at the
            end of the subscription period unless you cancel it.
          </li>
        </ul>

        <h2 className="text-xl font-semibold mt-4">3. User Conduct</h2>
        <p>
          You are responsible for all activities under your account. You agree
          not to:
        </p>
        <ul className="list-disc pl-5">
          <li>Use the website for any illegal purpose.</li>
          <li>
            Post or transmit any content that is abusive, defamatory,
            infringing, obscene, or otherwise objectionable.
          </li>
          <li>Harm or exploit minors in any way.</li>
          <li>Transmit any malware, spam, or other harmful computer code.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-4">4. Content Ownership</h2>
        <p>
          You retain all rights to the content you post on the website but grant
          us a non-exclusive, worldwide, royalty-free license to use, copy,
          modify, distribute, and display such content in connection with the
          service.
        </p>

        <h2 className="text-xl font-semibold mt-4">5. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your account and refuse
          any current or future use of our services if you violate these terms.
        </p>

        <h2 className="text-xl font-semibold mt-4">
          6. Disclaimer of Warranties
        </h2>
        <p>
          Our services are provided "as is" and "as available" without any
          warranties, express or implied, including but not limited to, implied
          warranties of merchantability, fitness for a particular purpose, or
          non-infringement.
        </p>

        <h2 className="text-xl font-semibold mt-4">
          7. Limitation of Liability
        </h2>
        <p>
          To the maximum extent permitted by law, we shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages
          resulting from your access to or use of our services.
        </p>

        <h2 className="text-xl font-semibold mt-4">
          8. Changes to Terms of Service
        </h2>
        <p>
          We reserve the right to modify these terms at any time. Your continued
          use of the site after any such changes constitutes your acceptance of
          the new terms.
        </p>

        <h2 className="text-xl font-semibold mt-4">9. Governing Law</h2>
        <p>
          These terms shall be governed by and construed in accordance with the
          laws of [Jurisdiction], without giving effect to any principles of
          conflicts of law.
        </p>

        <h2 className="text-xl font-semibold mt-4">10. Contact Us</h2>
        <p>
          For any questions about these Terms of Service, please contact us at
          [Contact Information].
        </p>
      </div>
    </div>
  );
};

export default Tos;
