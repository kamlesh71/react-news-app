import { useCallback } from "react";
import { Toolbar } from "../components/toolbar/toolbar";
import { usePersonalizedNews } from "../store/usePersonalizedNews";
import { NewsCard } from "../components/news/news-card";
import { NewsGrid } from "../components/news/news-grid";
import { PersonalizedFilter } from "../types";
import { useMountedEffect } from "@/common/hooks/useMountedEffect";
import { useScrollEndReached } from "@/common/hooks/useScrollEndReached";
import { EmptyMessage } from "../components/news/empty-message";

const PersonalizedNews: React.FC = () => {

    const { fetch, filters, loading, data, fetchMore } = usePersonalizedNews();

    const elementRef = useScrollEndReached(fetchMore);

    useMountedEffect(() => {
        fetch();
    });

    const onFilterChange = useCallback((filter: PersonalizedFilter) => {
        fetch(filter);
    }, [])

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
            <Toolbar 
                filters={filters} 
                onFilterChange={onFilterChange} 
                showCategory={false} 
                showSource={false} 
            />
            {renderNews()}
        </>
    )
}

export default PersonalizedNews;