import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { useNews } from "@/news/store/useNews";
import { SelectProps } from "@radix-ui/react-select";

const SourceInput: React.FC<SelectProps> = (props) => {

    const sources = useNews(state => state.filterOptions.sources);

    return (
        <Select {...props} >
            <SelectTrigger>
                <SelectValue placeholder="Source" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {sources.map(category => (
                        <SelectItem 
                            key={category.value.toString()} 
                            value={category.value.toString()}
                        >{category.label}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );

}

export { SourceInput };