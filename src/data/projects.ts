import type { Project } from '../types';

// Real Project Data Provided by User
const baseProjects: Project[] = [
    {
        id: '1',
        title: 'RentSetu',
        description: 'Rental Marketplace Platform helping users find verified homes, apartments, and PGs across India.',
        thumbnail: '/rensetu.png',
        techStack: ['Figma', 'UX Research', 'Design Systems'],
        liveLink: 'https://rentsetu.in',
        githubLink: 'https://www.figma.com/design/9w9zFa8PTisHM0SiFPWXdh/Tenant-site?node-id=0-1&t=0ha86OzFqnagmKOG-1',
    },
    {
        id: '2',
        title: 'EcoRoute',
        description: 'Sustainable delivery platform leveraging AI-based route optimization and blockchain rewards.',
        thumbnail: '/ecoroute.png',
        techStack: ['Figma', 'React', 'Flutter', 'FastAPI', 'MongoDB'],
        liveLink: 'https://eco-route-landing-page.vercel.app/',
        githubLink: 'https://github.com/Frost3057/EcoRoute',
    },
    {
        id: '3',
        title: 'DevsHouse',
        description: 'National-level hackathon website supporting 1000+ participants.',
        thumbnail: '/devshouse.png',
        techStack: ['Figma', 'Responsive Design', 'Design Systems'],
        liveLink: 'https://devshouse.in',
        githubLink: 'https://www.figma.com/design/r8tQP6tWBQOSKh9nNlyV7v/Devshouse?node-id=133-32&t=gcXXhN6auaRCN1zW-1',
    },
    {
        id: '4',
        title: 'Hercules Cycles',
        description: 'Website Redesign to improve visual hierarchy and enhance product discoverability.',
        thumbnail: '/hercules.png',
        techStack: ['Figma', 'UX Audit', 'Wireframing', 'UI Design'],
        liveLink: 'https://www.behance.net/gallery/243427679/Hercules-Cycle-Website-Redesign',
        githubLink: 'https://www.figma.com/design/dxIEEHCLrFPhyZicr0s1Xi/Hercules-website-redesign?node-id=0-1&t=dspiptHKRNyQFSg3-1',
    },
    {
        id: '5',
        title: 'Illuminated',
        description: 'Web3 Digital Identity Platform where users can claim NFT-based digital identities.',
        thumbnail: '/illuminated.png',
        techStack: ['Figma', 'UI Design', 'Prototyping'],
        liveLink: 'https://www.behance.net/gallery/243446165/Web3-onboarding-experience',
        githubLink: 'https://www.figma.com/design/44VaCK66rySvaUy78lnNly/Web3?t=dspiptHKRNyQFSg3-1',
    },
    {
        id: '6',
        title: 'Apple Vision Pro',
        description: 'Scroll Animation Study recreating the Apple Vision Pro landing experience.',
        thumbnail: '/applevision.png',
        techStack: ['Figma', 'Prototyping', 'Interaction Design'],
        liveLink: 'https://www.behance.net/gallery/243428489/Apple-Vision-Pro-Scroll-Animation-in-Figma',
        githubLink: 'https://www.figma.com/design/MzTs8wrBm4wzsbH41GMXW2/Apple-vision-pro-rcreated?t=dspiptHKRNyQFSg3-1',
    },
    {
        id: '7',
        title: 'CampusPreps',
        description: 'Multi-University Study Platform for centralized access to notes and learning materials.',
        thumbnail: '/campuspreps.png',
        techStack: ['Next.js', 'Tailwind CSS', 'TypeScript', 'Figma'],
        liveLink: 'https://campuspreps.vercel.app/',
        githubLink: 'https://github.com/shreyash-droid/campuspreps',
    },
    {
        id: '8',
        title: 'KeyNcoders - UI/UX Internship',
        description: 'Redesigned KeyNcoders’ digital platform end-to-end, focusing on improving user experience, information architecture, and visual consistency.',
        thumbnail: '/keyncoders.png',
        techStack: ['Figma', 'Wireframing', 'Prototyping', 'Design Systems', 'UX Research', 'Information Architecture'],
        liveLink: 'https://www.keyncoders.com/',
        githubLink: 'https://drive.google.com/file/d/1D9S4LR5_nL6t-4SI8OTsd82TCVoHLj2N/view?usp=drive_link',
    },
];

// Duplicate list to ensure ring is populated (14 items total)
export const projects: Project[] = [
    ...baseProjects,
    ...baseProjects.map(p => ({ ...p, id: p.id + '_copy', title: p.title })),
];
