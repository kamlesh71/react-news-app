import { Button } from "@/common/components/ui/button";
import { Form } from "@/common/components/ui/form";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/common/components/ui/sheet";
import { SubmitHandler, useForm } from "react-hook-form";
import { usePreferenceStore } from "../store/usePreferenceStore";
import { useEffect } from "react";
import { useNews } from "@/news/store/useNews";
import { SelectField } from "@/common/components/form/select-field";

interface Inputs {
    sources: number[];
    categories: number[];
    authors: number[];
}
const Preference = () => {

    const filterOptions = useNews(state => state.filterOptions);

    const { show, onShowChange, loading, update, preference_authors, preference_categories, preference_sources } = usePreferenceStore();

    const form = useForm({
        defaultValues: {
            sources: [] as number[],
            categories: [] as number[],
            authors: [] as number[],
        },
    })

    const onSubmit: SubmitHandler<Inputs> = ({ categories, sources, authors }) => {
        update(
            sources, 
            categories, 
            authors
        );
    };

    useEffect(() => {
        if (show) {
            form.setValue('categories', preference_categories);
            form.setValue('authors', preference_authors);
            form.setValue('sources', preference_sources);
        }
    }, [show, form]);

    return (
        <Sheet open={show} onOpenChange={onShowChange}>
            <SheetTrigger asChild>
                <Button variant="outline">Preference</Button>
            </SheetTrigger>

            <SheetContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-5">
                            <SheetHeader>
                                <SheetTitle>Edit preference</SheetTitle>
                                <SheetDescription>
                                    Update your preferences for personalized feed.
                                </SheetDescription>
                            </SheetHeader>
                            <SelectField  
                                name="categories"     
                                label="Categories"
                                isMulti
                                options={filterOptions.categories}
                            />
                             <SelectField  
                                name="sources"  
                                label="Sources"   
                                isMulti
                                options={filterOptions.sources}
                            />
                             <SelectField  
                                name="authors"  
                                label="Authors"   
                                isMulti
                                options={filterOptions.authors}
                            />
                        
                            <SheetFooter>
                                <Button disabled={loading} type="submit">Save changes</Button>
                            </SheetFooter>
                        </div>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    )
}

export { Preference };