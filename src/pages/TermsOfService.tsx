import { PageHeader } from '@/components/PageHeader';

export default function TermsOfService() {
  return (
    <div className="pt-24 pb-16 min-h-screen flex flex-col">
      <PageHeader
        eyebrow="Terms"
        title="Terms of Service"
        intro="The rules for using luminavou.com. We've kept these as plain as we reasonably can."
      />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose prose-stone max-w-none">

            <p className="text-sm text-stone-500">
              <strong>Last updated:</strong> 28 April 2026
            </p>

            <h2>The short version</h2>
            <p>
              These terms cover what you can expect from us, and what we expect from you, when
              you use this website. They apply to anyone who visits luminavou.com, fills out the
              contact form, creates an account, or uploads files to their profile. They do not
              cover any solar installation work we do for you under a separate contract — that's
              a separate signed agreement between you and Lumina Vou.
            </p>

            <h2>1. Who we are</h2>
            <p>
              "Lumina Vou", "we", "us" and "our" means Lumina Vou, a company registered in Fiji
              with our office in Suva. The website is{' '}
              <a href="https://luminavou.com">luminavou.com</a>.
            </p>

            <h2>2. Accepting these terms</h2>
            <p>
              By using the site, contacting us through it, or creating an account, you agree to
              these terms. If you don't agree, please don't use the site.
            </p>

            <h2>3. Eligibility</h2>
            <p>
              You must be at least 18 years old to create an account or submit our contact form.
              By doing either, you confirm you are 18 or older. If you're using the site on
              behalf of an organisation, you confirm you have authority to bind that organisation
              to these terms.
            </p>

            <h2>4. Your account</h2>
            <p>
              If you create an account, you are responsible for keeping your login credentials
              secure and for everything that happens under your account. Please tell us
              immediately at <a href="mailto:bula@luminavou.com">bula@luminavou.com</a> if you
              suspect someone else has accessed your account. We may suspend or close any account
              that breaches these terms.
            </p>

            <h2>5. Acceptable use</h2>
            <p>When using our site you agree not to:</p>
            <ul>
              <li>break any Fijian or other applicable law</li>
              <li>upload anything that is illegal, infringing, defamatory, or harmful</li>
              <li>upload malware, viruses, or content designed to harm our systems or other users</li>
              <li>attempt to gain unauthorised access to our systems or other users' data</li>
              <li>use the site to send spam, phishing attempts, or unsolicited messages</li>
              <li>impersonate any other person or business</li>
              <li>use automated tools (scrapers, bots) in a way that affects performance for other users</li>
              <li>reverse-engineer, decompile, or attempt to extract our source code</li>
            </ul>

            <h2>6. Files you upload</h2>
            <p>
              You keep ownership of any files you upload to your profile. By uploading a file,
              you confirm that you have the right to upload it and that it doesn't break the
              acceptable-use rules above. We store uploaded files privately, accessible only to
              you (and to a limited number of Lumina Vou staff for support and abuse moderation).
            </p>
            <p>
              You can delete your files at any time. If you close your account, we will delete
              your files within 30 days.
            </p>

            <h2>7. Our content</h2>
            <p>
              All content on the site that we own — including text, photography, illustrations,
              the Lumina Vou name, our logo, and the design of the site itself — is the
              intellectual property of Lumina Vou and is protected under Fijian and international
              copyright and trademark law. You may view it, share links to it, and quote
              reasonable extracts with attribution. You may not copy, reproduce, or republish
              substantial portions of it without our written permission.
            </p>

            <h2>8. Information on the site</h2>
            <p>
              We try to keep all information on the site accurate and up to date — pricing,
              specifications, claims about our products, case studies, and so on. But we don't
              guarantee that every piece of information is current, complete, or error-free at
              every moment. If something on the site contradicts a written quote or contract from
              us, the quote or contract takes precedence.
            </p>

            <h2>9. Third-party links and services</h2>
            <p>
              The site may link to other websites or services that we don't control. We're not
              responsible for the content, terms, or privacy practices of those third parties.
              Following a link from our site is at your own risk.
            </p>

            <h2>10. The site is provided "as is"</h2>
            <p>
              We work hard to keep the site running well, but we provide it "as is" and "as
              available". To the extent allowed by law, we make no warranties or representations
              about the site, its content, or its uptime — including warranties of
              merchantability, fitness for a particular purpose, or non-infringement.
            </p>

            <h2>11. Limitation of liability</h2>
            <p>
              To the maximum extent allowed by Fijian law, Lumina Vou and its directors,
              employees, and contractors will not be liable for any indirect, incidental,
              special, or consequential damages arising from your use of the site — including
              loss of data, loss of profits, or business interruption — even if we were told such
              damages were possible.
            </p>
            <p>
              Nothing in these terms limits any rights you may have under the Fiji Consumer
              Protection Act or other consumer-protection law that cannot be excluded by
              agreement.
            </p>

            <h2>12. Indemnity</h2>
            <p>
              You agree to indemnify Lumina Vou against any third-party claims, losses, or
              expenses arising from your breach of these terms or your misuse of the site.
            </p>

            <h2>13. Termination</h2>
            <p>
              You may stop using the site at any time and request that we close your account by
              emailing <a href="mailto:bula@luminavou.com">bula@luminavou.com</a>. We may suspend
              or terminate your access to the site (with or without notice) if you breach these
              terms, if continuing to provide the site to you would expose us to legal risk, or
              if we discontinue the service. Sections 6 (Files), 7 (Our content), 10–12
              (Disclaimers, liability, indemnity), and 14 (Governing law) survive termination.
            </p>

            <h2>14. Governing law and disputes</h2>
            <p>
              These terms are governed by the laws of the Republic of Fiji. Any dispute arising
              from these terms or your use of the site will be dealt with by the courts of Fiji,
              unless we both agree otherwise in writing. If you'd prefer to resolve a complaint
              informally first, please email us — we'd much rather sort it out directly.
            </p>

            <h2>15. Changes to these terms</h2>
            <p>
              We may update these terms from time to time. We'll update the "Last updated" date
              at the top, and where the change is material we'll let account holders know by
              email. Continuing to use the site after a change means you accept the new terms.
            </p>

            <h2>16. Contact us</h2>
            <p>
              Questions about these terms?
            </p>
            <p>
              Lumina Vou<br />
              Suva, Fiji<br />
              <a href="mailto:bula@luminavou.com">bula@luminavou.com</a>
            </p>

          </article>
      </main>
    </div>
  );
}
