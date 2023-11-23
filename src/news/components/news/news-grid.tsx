import React from "react";

const NewsGrid = React.forwardRef<HTMLDivElement, React.PropsWithChildren<{ loadingMore?: boolean }>>(({ children, loadingMore }, forwardedRef) => {
    return (
        <div>
            <div ref={forwardedRef} className="grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 xxl:grid-cols-6 gap-4">
                {children}
            </div>
            {loadingMore && <div className="py-4 text-center bg-slate-100 mt-5 rounded-sm">Loading...</div>}
        </div>
    )
});

export { NewsGrid };