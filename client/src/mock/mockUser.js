const YOUTUBE_ID = 'UusS2QZioqY';
const YOUTUBE_PREVIEW = `https://img.youtube.com/vi/${YOUTUBE_ID}/hqdefault.jpg`;
const YOUTUBE_VIDEO = `https://www.youtube.com/embed/${YOUTUBE_ID}`;
const proverka = 'https://youtu.be/UusS2QZioqY?si=OHN-G1a1IJsSwVTp';

const mockUser = {
    name: 'Саша',
    email: 'sasha@example.com',
    username: 'sashka',
    registrationDate: '2024-10-01',
    favorites: Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        title: `Edit #${i + 1}`,
        preview: YOUTUBE_PREVIEW,
        video: YOUTUBE_VIDEO,
        tags: ['вдохновение', 'музыка'],
        author: '@editor_example',
        date: '2025-05-24',
    })),
};

export default mockUser;
