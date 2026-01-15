import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

const Faq = () => {
  return (
    <div id="faq" className="mb-32">
      <h2 className="text-4xl text-center mb-10 font-extrabold text-gray-900 dark:text-white">
        Frequently Asked Questions
      </h2>
      <Accordion
        type="single"
        collapsible
        className="w-full p-5 lg:max-w-[511px]"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            What&apos;s the installation process?
          </AccordionTrigger>
          <AccordionContent>
            We start with a free survey of your property, followed by a detailed
            proposal. Once you&apos;re happy to proceed, our engineers install
            the outdoor unit, cylinder and controls, usually within a few days.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Does an air source heat pump integrate with other technologies?
          </AccordionTrigger>
          <AccordionContent>
            Yes. Heat pumps work well alongside underfloor heating, modern
            radiators, solar PV and smart thermostats. We&apos;ll design a
            system that fits your existing setup.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>How much can I save?</AccordionTrigger>
          <AccordionContent>
            Savings depend on your current fuel type, property size and
            insulation. Many customers see significant reductions in their
            heating bills, especially when replacing electric, oil or LPG
            systems.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Do I need planning permission?</AccordionTrigger>
          <AccordionContent>
            In most cases air source heat pumps are classed as permitted
            development, so planning permission isn&apos;t required. We&apos;ll
            advise you if your property has any special considerations.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Faq;
