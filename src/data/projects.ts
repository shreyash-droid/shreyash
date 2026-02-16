import type { Project } from '../types';

// Real Project Data Provided by User
const baseProjects: Project[] = [
    {
        id: '1',
        title: 'RentSetu',
        description: 'Rental Marketplace Platform helping users find verified homes, apartments, and PGs across India.',
        thumbnail: '/rensetu.png',
        techStack: ['Figma', 'UX Research', 'Design Systems'],
        liveLink: 'https://example.com',
        githubLink: 'https://github.com',
    },
    {
        id: '2',
        title: 'EcoRoute',
        description: 'Sustainable delivery platform leveraging AI-based route optimization and blockchain rewards.',
        thumbnail: '/ecoroute.png',
        techStack: ['Figma', 'React', 'Flutter', 'FastAPI', 'MongoDB'],
        liveLink: 'https://example.com',
        githubLink: 'https://github.com',
    },
    {
        id: '3',
        title: 'DevsHouse',
        description: 'National-level hackathon website supporting 1000+ participants.',
        thumbnail: '/devshouse.png',
        techStack: ['Figma', 'Responsive Design', 'Design Systems'],
        liveLink: 'https://example.com',
        githubLink: 'https://github.com',
    },
    {
        id: '4',
        title: 'Hercules Cycles',
        description: 'Website Redesign to improve visual hierarchy and enhance product discoverability.',
        thumbnail: '/hercules.png',
        techStack: ['Figma', 'UX Audit', 'Wireframing', 'UI Design'],
        liveLink: 'https://example.com',
        githubLink: 'https://github.com',
    },
    {
        id: '5',
        title: 'Illuminated',
        description: 'Web3 Digital Identity Platform where users can claim NFT-based digital identities.',
        thumbnail: '/illuminated.png',
        techStack: ['Figma', 'UI Design', 'Prototyping'],
        liveLink: 'https://example.com',
        githubLink: 'https://github.com',
    },
    {
        id: '6',
        title: 'Apple Vision Pro',
        description: 'Scroll Animation Study recreating the Apple Vision Pro landing experience.',
        thumbnail: '/applevision.png',
        techStack: ['Figma', 'Prototyping', 'Interaction Design'],
        liveLink: 'https://example.com',
        githubLink: 'https://github.com',
    },
    {
        id: '7',
        title: 'CampusPreps',
        description: 'Multi-University Study Platform for centralized access to notes and learning materials.',
        thumbnail: '/campuspreps.png',
        techStack: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Figma'],
        liveLink: 'https://example.com',
        githubLink: 'https://github.com',
    },
    {
        id: '8',
        title: 'KeyNcoders - UI/UX Internship',
        description: 'Redesigned KeyNcoders’ digital platform end-to-end, focusing on improving user experience, information architecture, and visual consistency.',
        thumbnail: '/keyncoders.png',
        techStack: ['Figma', 'Wireframing', 'Prototyping', 'Design Systems', 'UX Research', 'Information Architecture'],
        liveLink: 'https://example.com',
        githubLink: 'https://github.com',
    },
];

// Duplicate list to ensure ring is populated (14 items total)
export const projects: Project[] = [
    ...baseProjects,
    ...baseProjects.map(p => ({ ...p, id: p.id + '_copy', title: p.title + ' (Copy)' })),
];
