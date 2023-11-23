import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input, InputProps } from "../ui/input";

type Props = {
    label: string;
    name: string;
} & InputProps & React.RefAttributes<HTMLInputElement>;

export const Field: React.FC<Props> = ({ label, name, ...props }) => (
    <FormField
        name={name}
        render={({ field }) => (
            <FormItem>
                <FormLabel>{label}</FormLabel>
                <FormControl>
                    <Input {...props} {...field} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )}
    />
)