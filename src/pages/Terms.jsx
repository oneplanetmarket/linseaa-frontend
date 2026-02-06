export default function Terms() {
  return (
    <div className="min-h-screen bg-[#020617]">
      {/* 🔥 TOP PADDING FIX */}
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-20 text-white">
        {/* pt-28 clears fixed navbar */}

        <h1 className="text-3xl font-bold mb-4">
          Linseaa – Terms & Conditions
        </h1>

        <p className="text-sm text-white/60 mb-8">
          Last updated: 05/02/2026
        </p>

        <div className="space-y-6 text-white/80 leading-relaxed">
          <p>
            By joining <strong>Linseaa</strong>, you agree to these Terms &
            Conditions. Please read them carefully before renting your account.
          </p>

          <section>
            <h2 className="font-semibold text-lg mb-2">
              1. What Linseaa Does
            </h2>
            <p>
              Linseaa works as a mediator between LinkedIn account holders
              and clients who use these profiles for promotion and outreach.
              We do not own your account—we only manage it for a fixed time.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">
              2. Who Can Join
            </h2>
            <ul className="list-disc ml-6">
              <li>You must be 18+</li>
              <li>You must own the LinkedIn account you’re renting</li>
              <li>You must provide correct onboarding details</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">
              3. Account Access
            </h2>
            <p>
              Once your account is rented, you give Linseaa access to manage
              it during the agreed tenure.
            </p>

            <p className="mt-3 text-red-400 font-semibold">
              🚨 VERY IMPORTANT – NO LOGIN RULE
            </p>
            <ul className="list-disc ml-6">
              <li>You must NOT log in during the rental period</li>
              <li>Login attempts may disrupt campaigns</li>
              <li>This can lead to termination and loss of payments</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">
              4. Profile Changes
            </h2>
            <p>
              Your name, photo, headline, bio, and details may be changed
              temporarily during the rental duration.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">
              5. How Your Account Is Used
            </h2>
            <ul className="list-disc ml-6">
              <li>Marketing & promotions</li>
              <li>Outreach & lead generation</li>
              <li>Brand or business campaigns</li>
            </ul>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">
              6. Payments
            </h2>
            <p>
              Payments are made as per the agreed plan. Violations may
              result in withheld or cancelled payments.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">
              7. Confidentiality
            </h2>
            <p>
              You agree not to share any client details, campaign methods,
              or internal Linseaa information.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">
              8. Termination
            </h2>
            <p>
              Linseaa may suspend or terminate access if terms are violated
              or suspicious activity is detected.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">
              9. Platform Risk
            </h2>
            <p>
              LinkedIn may restrict or disable accounts without warning.
              Linseaa is not responsible for such actions.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-lg mb-2">
              10. Acceptance
            </h2>
            <p>
              By registering, you confirm that you have read, understood,
              and accepted these terms.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}