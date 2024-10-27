import React from 'react';

export default function page() {
    return (
        <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
            <h1 className="text-4xl font-bold text-center mb-4">Privacy Policy</h1>

            <section>
                <h2 className="text-2xl font-semibold">1. Introduction</h2>
                <p className="text-gray-600 mt-2">
                    YouTube Power Tools is committed to protecting your privacy. This Privacy Policy explains what information we collect, how we use it, and your rights regarding your information. By using our service, you agree to the collection and use of information in accordance with this Privacy Policy.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">2. Information We Collect</h2>
                <p className="text-gray-600 mt-2">
                    We collect only the information necessary to provide and improve our service:
                </p>
                <ul className="list-disc ml-6 text-gray-600">
                    <li><strong>User-provided Information:</strong> Such as your email address and account settings.</li>
                    <li><strong>Automatic Information:</strong> We collect usage data to monitor performance and improve the app, such as how often certain features are used.</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">3. How We Use Your Information</h2>
                <p className="text-gray-600 mt-2">
                    We use the collected information for various purposes:
                </p>
                <ul className="list-disc ml-6 text-gray-600">
                    <li>To provide and maintain our service</li>
                    <li>To notify you about changes to our service</li>
                    <li>To provide customer support</li>
                    <li>To monitor usage and improve our service</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">4. Sharing Your Information</h2>
                <p className="text-gray-600 mt-2">
                    We do not share your information with third parties, except:
                </p>
                <ul className="list-disc ml-6 text-gray-600">
                    <li>With your consent</li>
                    <li>When required by law</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">5. Security</h2>
                <p className="text-gray-600 mt-2">
                    We take security seriously and strive to implement commercially acceptable means to protect your data. However, no method of transmission over the internet or method of electronic storage is 100% secure, and we cannot guarantee its absolute security.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">6. Data Retention</h2>
                <p className="text-gray-600 mt-2">
                    We retain your information for as long as necessary to provide you with the service and to comply with our legal obligations.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">7. Your Rights</h2>
                <p className="text-gray-600 mt-2">
                    Depending on your location, you may have the right to access, update, or delete your information. To exercise these rights, please contact our support team.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">8. Changes to This Privacy Policy</h2>
                <p className="text-gray-600 mt-2">
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold">9. Contact Us</h2>
                <p className="text-gray-600 mt-2">
                    For questions regarding this Privacy Policy, please contact us at <a href="mailto:nimbagallohit@gmail.com" className="text-blue-500 underline">nimbagallohit@gmail.com</a>.
                </p>
            </section>
        </div>
    );
};

