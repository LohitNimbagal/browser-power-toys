import Footer from "./_components/footer";
import Header from "./_components/header";

export default function PublicRoutesLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
}
