
type Props = {
    title: string;
};

const FormCard: React.FC<React.PropsWithChildren<Props>> = ({ title, children }) => (
    <div className="max-w-sm mx-auto mt-14">
        <h3 className="font-bold text-2xl text-center p-5">{title}</h3>
        {children}
    </div>
)

export { FormCard };