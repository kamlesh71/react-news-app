import { useCallback } from "react";
import { useNews } from "../store/useNews";
import { Toolbar } from "../components/toolbar/toolbar";
import { NewsCard } from "../components/news/news-card";
import { Filter } from "../types";
import { NewsGrid } from "../components/news/news-grid";
import { useMountedEffect } from "@/common/hooks/useMountedEffect";
import { EmptyMessage } from "../components/news/empty-message";
import { useScrollEndReached } from "@/common/hooks/useScrollEndReached";

const NewsPage: React.FC = () => {

    const { data, fetch, fetchMore, loading, filters, initFilterOptions } = useNews();
    
    const elementRef = useScrollEndReached(fetchMore);

    useMountedEffect(() => {
        initFilterOptions();
        fetch(filters);
    });

    const onRequestFilter = useCallback((filter: Filter) => {
        fetch(filter);
    }, [fetch]);

    const renderNews = () => {

        if (loading && data.length == 0) {
            return <div className="text-center p-20">Loading...</div>;
        }

        if (data.length === 0) {
            return <EmptyMessage />
        }

        return (
            <NewsGrid 
                loadingMore={data.length > 0 && loading} 
                ref={elementRef}
            >
                {data.map(news => (
                    <NewsCard key={news.id} news={news} />
                ))}
            </NewsGrid>
        );
    }

    return (
        <>
            <Toolbar filters={filters} onFilterChange={onRequestFilter} />
            {renderNews()}
        </>
    )
}

export default NewsPage;