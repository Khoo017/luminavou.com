import { PageHeader } from '@/components/PageHeader';

export default function PrivacyPolicy() {
  return (
    <div className="pt-24 pb-16 min-h-screen flex flex-col">
      <PageHeader
        eyebrow="Privacy"
        title="Privacy Policy"
        intro="What we collect, why we collect it, and what we do with it. In plain English first, with the formal version below."
      />

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="prose prose-stone max-w-none">

            <p className="text-sm text-stone-500">
              <strong>Last updated:</strong> 28 April 2026
            </p>

            <h2>The short version</h2>
            <p>
              Lumina Vou is a solar engineering company based in Suva, Fiji. To run our website
              and serve you well, we collect a small amount of personal information — your name,
              email, and any messages you send us. If you create an account, we also store any
              files you upload privately. We don't sell your data, we don't share it for
              advertising, and we keep it only as long as we need to.
            </p>

            <p>
              If you'd rather just talk to us about anything in this policy, email us at{' '}
              <a href="mailto:bula@luminavou.com">bula@luminavou.com</a>.
            </p>

            <h2>1. Who we are</h2>
            <p>
              In this policy, "Lumina Vou", "we", "us" and "our" refers to Lumina Vou, a company
              registered in Fiji and based in Suva. Our website is{' '}
              <a href="https://luminavou.com">luminavou.com</a>.
            </p>

            <h2>2. Who can use this site</h2>
            <p>
              Our website and account features are intended for people aged 18 or older. By
              creating an account or submitting our contact form, you confirm that you are at
              least 18 years old. If you believe we have collected information from someone under
              18, please contact us so we can delete it.
            </p>

            <h2>3. What information we collect</h2>

            <h3>3.1 When you contact us</h3>
            <p>If you fill out our contact form, we collect:</p>
            <ul>
              <li>your name</li>
              <li>your email address</li>
              <li>your phone number (optional)</li>
              <li>the subject and content of your message</li>
              <li>which page on our site you submitted the form from</li>
              <li>your browser's user-agent string (for fraud and abuse prevention)</li>
            </ul>

            <h3>3.2 When you create an account</h3>
            <p>If you sign up for an account, we collect:</p>
            <ul>
              <li>your email address</li>
              <li>your password (stored as a one-way hash — we never see your actual password)</li>
              <li>your full name and profile photo, if you sign in with Google</li>
              <li>any files you choose to upload to your private profile</li>
            </ul>

            <h3>3.3 Automatically collected information</h3>
            <p>
              Like most websites, our hosting and analytics providers automatically log basic
              technical information when you visit, such as your IP address, browser type,
              operating system, the pages you visit, and the time of your visit. We use this
              information for security, debugging, and to understand how the site is used.
            </p>

            <h2>4. How we use your information</h2>
            <p>We use your information only for these purposes:</p>
            <ul>
              <li>to respond to your enquiries and provide quotes</li>
              <li>to operate your account and store your files securely</li>
              <li>to send you transactional emails (account confirmations, password resets, replies to your enquiry)</li>
              <li>to keep the site secure and prevent abuse</li>
              <li>to comply with our legal obligations in Fiji</li>
            </ul>
            <p>
              We do <strong>not</strong> use your information for advertising, profiling, or any
              automated decision-making that would significantly affect you.
            </p>

            <h2>5. Who we share your information with</h2>
            <p>
              We don't sell your data. We share it only with the third-party service providers we
              use to run the site, and only to the extent each one needs to do its job:
            </p>
            <ul>
              <li>
                <strong>Supabase</strong> (hosted in Mumbai, India) — stores your account, profile,
                and uploaded files
              </li>
              <li>
                <strong>Vercel</strong> (hosted in Sydney, Australia for our region) — serves the
                website and logs basic request information
              </li>
              <li>
                <strong>Resend</strong> (hosted in Tokyo, Japan for our region) — sends
                transactional emails to and from us
              </li>
              <li>
                <strong>Google</strong> — only if you choose to sign in with your Google account
              </li>
              <li>
                <strong>Purelymail</strong> — receives email sent to{' '}
                <a href="mailto:bula@luminavou.com">bula@luminavou.com</a>
              </li>
            </ul>
            <p>
              We will also disclose information if we are legally required to do so by Fijian
              authorities, or to protect the safety of any person.
            </p>

            <h2>6. International data transfers</h2>
            <p>
              Because we use the providers listed above, your data may be processed outside Fiji
              — including in India, Australia, Japan, the United States, and other countries
              where these providers operate. We choose providers that take data protection
              seriously, but laws in those countries may differ from Fijian law.
            </p>

            <h2>7. How long we keep your information</h2>
            <ul>
              <li>
                <strong>Contact form submissions:</strong> kept for up to 3 years so we can
                follow up if you contact us again, then deleted
              </li>
              <li>
                <strong>Account data:</strong> kept as long as your account is active. You can
                delete your account at any time by emailing us
              </li>
              <li>
                <strong>Uploaded files:</strong> kept as long as you keep them in your profile.
                You can delete them at any time
              </li>
              <li>
                <strong>Server logs:</strong> typically rotated within 30 days
              </li>
            </ul>

            <h2>8. Your rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>ask us what information we hold about you</li>
              <li>ask us to correct inaccurate information</li>
              <li>ask us to delete your information</li>
              <li>ask us to send you a copy of your data</li>
              <li>withdraw your consent for anything you previously agreed to</li>
            </ul>
            <p>
              To exercise any of these rights, email{' '}
              <a href="mailto:bula@luminavou.com">bula@luminavou.com</a>. We will respond within
              30 days.
            </p>

            <h2>9. Security</h2>
            <p>
              We take reasonable steps to protect your information, including encrypting data in
              transit (HTTPS), encrypting your files at rest, and using strong access controls so
              that only you can see your private files. No system is perfectly secure, however,
              and we can't guarantee absolute security.
            </p>

            <h2>10. Cookies and tracking</h2>
            <p>
              We use a small number of essential cookies to keep you signed in and to make the
              site function. We don't use advertising cookies and we don't track you across other
              websites.
            </p>

            <h2>11. Changes to this policy</h2>
            <p>
              If we change this policy in a way that meaningfully affects your rights, we will
              update the "Last updated" date at the top and, where reasonably possible, notify
              account holders by email.
            </p>

            <h2>12. Contact us</h2>
            <p>
              If you have any questions, complaints, or requests about your privacy, please
              contact:
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
