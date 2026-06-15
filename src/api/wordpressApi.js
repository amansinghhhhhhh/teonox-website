const API_URL =
    "https://cms.teonox.com/index.php?rest_route=/wp/v2";

// Categories
export const getCategories = async () => {
    const res = await fetch(`${API_URL}/categories`);
    const data = await res.json();

    return data.filter(
        (cat) => cat.slug !== "uncategorized"
    );
};

// All Blogs
export const getBlogs = async (categoryId = "") => {
    let url = `${API_URL}/posts&_embed&per_page=20`;

    if (categoryId) {
        url += `&categories=${categoryId}`;
    }

    const res = await fetch(url);
    return await res.json();
};

// Single Blog By Slug
export const getBlogBySlug = async (slug) => {
    const res = await fetch(
        `${API_URL}/posts&slug=${encodeURIComponent(slug)}&_embed`
    );

    const data = await res.json();

    return data[0];
};

// Related Blogs
export const getRelatedBlogs = async (
    categoryId,
    currentPostId
) => {
    const res = await fetch(
        `${API_URL}/posts&_embed&categories=${categoryId}&per_page=4`
    );

    const posts = await res.json();

    return posts.filter(
        (post) => post.id !== currentPostId
    );
};


///////////////////////-- Programs API --///////////////////////

// Program Categories
export const getProgramCategories = async () => {
    const res = await fetch(
        `${API_URL}/program-category`
    );

    return await res.json();
};

// Programs List
export const getPrograms = async (
    categoryId = ""
) => {
    let url =
        `${API_URL}/program&_embed&per_page=20`;

    if (categoryId) {
        url += `&program-category=${categoryId}`;
    }

    const res = await fetch(url);

    return await res.json();
};

// Single Program
export const getProgramBySlug = async (
    slug
) => {
    const res = await fetch(
        `${API_URL}/program&slug=${encodeURIComponent(slug)}&_embed`
    );

    const data = await res.json();

    return data[0];
};

// Related Programs
export const getRelatedPrograms = async (
    categoryId,
    currentProgramId
) => {
    const res = await fetch(
        `${API_URL}/program&_embed&program-category=${categoryId}&per_page=4`
    );

    const programs = await res.json();

    return programs.filter(
        (item) => item.id !== currentProgramId
    );
};

// Media URL by ID
export const getMediaUrl = async (id) => {
    const res = await fetch(`${API_URL}/media/${id}`);
    const data = await res.json();
    return data.source_url;
};

// Careers
export const getCareers = async () => {
    const res = await fetch(`${API_URL}/career&_embed`);
    return await res.json();
};