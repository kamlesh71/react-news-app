import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { useNews } from "@/news/store/useNews";
import { SelectProps } from "@radix-ui/react-select";

const CategoryInput: React.FC<SelectProps> = (props) => {

    const categories = useNews(state => state.filterOptions.categories);

    return (
        <Select {...props}>
            <SelectTrigger>
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent align="end">
                <SelectGroup>
                    {categories.map(category => (
                        <SelectItem key={category.value} value={category.value.toString()}>{category.label}</SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );

}

export { CategoryInput };