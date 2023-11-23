import { DatePickerWithRange } from "@/common/components/form/date-range-picker";
import { Input } from "@/common/components/ui/input";
import debounce from 'debounce';
import { DateRange } from "react-day-picker";
import { CategoryInput } from "./category-input";
import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { ToolbarProps } from "@/news/types";
import { SourceInput } from "./source-input";

const NavLink = ({ children, ...props }: NavLinkProps & React.RefAttributes<HTMLAnchorElement>) => (
    <RouterNavLink className={({ isActive }) => {
        return isActive ? 'text-foreground' : 'text-foreground/60'
    }} {...props}>{children}</RouterNavLink>
)


const Toolbar: React.FC<ToolbarProps> = ({ onFilterChange, filters, showCategory = true, showSource = true }) => {

    const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onFilterChange(({
            ...filters,
            search: e.target.value.trim(),
        }));
    };

    const onDateChange = (date: DateRange | undefined) => {
        if (date !== undefined) {
            onFilterChange({
                ...filters,
                date: date,
            });
        }
    };

    const onSourceChange = (value: string) => {
        onFilterChange({
            ...filters,
            source: value,
        });
    };

    const onCategoryChange = (value: string) => {
        onFilterChange({
            ...filters,
            category: value,
        });
    };

    return (
        <div className="flex flex-col lg:flex-row py-10 lg:justify-between md:items-center">
            <nav className="space-x-4 pb-6 lg:pb-0 self-center">
                <NavLink to="/">All</NavLink>
                <NavLink to="/personalized">Personalized</NavLink>
            </nav>

            <div className="grid space-y-6 md:grid-flow-col md:space-y-0 md:space-x-3">
                <Input type="search" defaultValue={filters.search} onChange={debounce(onSearchChange, 300)} placeholder="Search a keyword" />
                <DatePickerWithRange onSelect={onDateChange} selected={filters.date} />

                {showSource && (
                    <div className="min-w-[160px]">
                        <SourceInput defaultValue={filters.source} onValueChange={debounce(onSourceChange, 300)} />
                    </div>
                )}
                {showCategory && (
                    <div className="min-w-[160px]">
                        <CategoryInput  defaultValue={filters.category} onValueChange={debounce(onCategoryChange, 300)} />
                    </div>
                )}
            </div>
        </div>
    )
}

export { Toolbar };