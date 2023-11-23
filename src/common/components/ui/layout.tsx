import Header from "@/common/components/ui/header";

const Layout = ({ children }: React.PropsWithChildren) => {

    return (
        <main>
            <Header />
            <div className="container mx-auto mt-16">
                {children}
            </div>
            <footer className="py-8 mt-16 bg-gray-50">
                <div className="container text-center">
                    Thanks for visiting!!
                </div>
            </footer>
        </main>
    )
}

export default Layout;