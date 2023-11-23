import { StateManagerProps } from 'node_modules/react-select/dist/declarations/src/stateManager';
import Select from 'react-select'
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

type Props = StateManagerProps & { name: string, label: string };

const SelectField: React.FC<Props> = ({ name, label, ...props }) => {
    return (
        <FormField
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>{label}</FormLabel>
                    <FormControl>
                        <Select
                            {...props}
                            value={props.options?.filter((o) => field.value.includes((o as { value: number }).value))}
                            onChange={(options) => field.onChange((options as { value: number }[]).map(o => o.value))}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export { SelectField };