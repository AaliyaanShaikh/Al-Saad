
import { Project } from './types';

// Project data configuration
// To update images: Place your image files in the /public folder and reference them as '/filename.jpg'
// To update descriptions: Edit the description field for each project below
export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Vision Heights',
    description: 'Freehold Land | Nearing Possession | Jogeshwari West Prime | Western Suburbs By Fiona Realty',
    category: 'exclusive',
    year: '2026',
    // To use a local image: Place image in /public folder and use '/filename.jpg'
    // Example: image: '/IMG_4653.jpg'
    image: '/screenshot-2026-02-04-vision.png',
    tags: ['Luxury', 'Villa', 'Premium'],
    link: '#',
    brochure: '/brochures/A WING - Vision Heights by Fiona Realty .pdf', // Opens in popup on click
    location: 'Upcoming Project',
    price: '1.57 - 2 Cr',
    beds: '2 & Grand 2',
    sqft: '500-900'
  },
  {
    id: '2',
    title: 'Aksa',
    description: 'Sophisticated House with city skyline views, high-end finishes, and premium location in the heart of the city. Ideal for professionals who appreciate urban luxury and convenience.',
    category: 'exclusive',
    year: '2026',
    // Update image path here: '/your-image-filename.jpg'
    image: '/screenshot-2026-02-04-sayba.png',
    tags: ['Aksa', 'Jogeshwari', 'Modern'],
    link: '#',
    brochure: '/brochures/AKSA BROCHURE N_compressed.pdf',
    location: 'Aqsa Masjid Road',
    price: 'Starting 1.75cr',
    beds: '2 & 3',
    sqft: '621-1200'
  },
  {
    id: '3',
    title: 'Dream India developer',
    description: 'Prime property ideal for residential, featuring modern infrastructure and excellent connectivity.',
    category: 'exclusive',
    year: '2026',
    // Update image path here: '/your-image-filename.jpg'
    image: '/Screenshot-Dream india.png',
    tags: ['Dream India developer', 'Residential', 'Exclusive'],
    link: '#',
    brochure: '/brochures/Dream India - Jogeshwari - Customer Deck v2.pdf',
    location: 'Relief Road',
    price: '1.11 - 1.77 Cr',
    beds: '2 & 3',
    sqft: '530-860'
  },
  {
    id: '4',
    title: 'Paradigm Alaya',
    description: 'Elegant residential property with stunning views, premium amenities, and resort-style living experience. Experience tranquility and luxury in this beautifully designed condominium.',
    category: 'exclusive',
    year: '2026',
    // Update image path here: '/your-image-filename.jpg'
    image: '/paradigm-alaya-replacement.png',
    tags: ['amenities', 'Condo', 'Luxury'],
    link: '#',
    brochure: '/brochures/A WING - Vision Heights by Fiona Realty .pdf',
    location: 'Relief Road',
    price: '1.29 - 1.81 Cr',
    beds: '1 & 2',
    sqft: '2,800'
  },
  {
    id: '5',
    title: 'Roswalt Zaiden',
    description: 'INDIA\'S BIGGEST RESIDENTIAL PROJECT by LAUNCH, Spacious 1, 2 & 3BHK houses for you to "LIVE A CELEB LIFE"',
    category: 'archived',
    year: '2026',
    // To use a local image: Place image in /public folder and use '/filename.jpg'
    // Example: image: '/IMG_4653.jpg'
    image: '/screenshot-roswalt.png',
    tags: ['Luxury', 'Villa', 'Premium'],
    link: 'https://www.youtube.com/watch?v=C4tyDdTRhmM',
    brochure: '/brochures/ROSWALT ZAIDEN - E-BROCHURE 2 BWING UPDATED CC.pdf',
    location: 'Upcoming Project',
    price: '1.80 - 3.90 Cr',
    beds: '1, 2 & 3',
    sqft: '400-1200'
  },
  {
    id: '6',
    title: 'SAYBA NOOR 2.0',
    description: 'Sophisticated House with city skyline views, high-end finishes, and premium location in the heart of the city. Ideal for professionals who appreciate urban luxury and convenience.',
    category: 'archived',
    year: '2026',
    // Update image path here: '/your-image-filename.jpg'
    image: '/Screenshot-sayba.png',
    tags: ['Sayba Noor 2.0', 'Jogeshwari', 'Modern'],
    link: '#',
    brochure: '/brochures/Noor A3 presenter Final_compressed.pdf',
    location: 'Sahankar Road',
    price: '1.28 - 2.41 Cr',
    beds: '1, 2 & 3',
    sqft: '460-1000'
  },
  {
    id: '7',
    title: 'Modern Apartment',
    description: 'Contemporary apartment with sleek design, smart home features, and prime urban location. Perfect for young professionals and couples seeking modern living in the city center.',
    category: 'archived',
    year: '2023',
    // Update image path here: '/your-image-filename.jpg'
    // Uses local demo image placed in public folder
    image: '/demo-modern-apartment.jpg',
    tags: ['Modern', 'Urban', 'Smart'],
    link: '#',
    brochure: '/brochures/A WING - Vision Heights by Fiona Realty .pdf',
    location: 'Urban Core',
    price: '$580K',
    beds: '2',
    sqft: '1,500'
  }
];

// Separate projects for ProjectCard component (Premium Showcase section)
// These are NOT used in PropertiesSection
export const SHOWCASE_PROJECTS: Project[] = [
  {
    id: 'showcase-1',
    title: 'Awarded Excellence',
    description: 'Honored to receive an award from Paradigm Realty in recognition of professional excellence. A milestone that reflects dedication, consistency, and growth.',
    category: 'showcase',
    year: '2024',
    // Update image path here: Place your image in /public folder and use '/filename.jpg'
    image: '/IMG_4653.jpg',
    tags: ['Recognition', 'Award Moment', 'Paradigm Realty'],
    link: '#',
  },
  {
    id: 'showcase-2',
    title: 'Team Achievement',
    description: 'A proud moment of collective success—recognizing teamwork, leadership, and the shared commitment that drives meaningful results.',
    category: 'showcase',
    year: '2025',
    // Update image path here: Place your image in /public folder and use '/filename.jpg'
    image: '/teamedit.png',
    tags: ['Teamwork', 'Leadership', 'Collaboration'],
    link: '#',
  },
  {
    id: 'showcase-3',
    title: 'Industry Appreciation',
    description: 'Appreciated by Lodha Group for consistent performance, collaborative execution, and a shared commitment to quality and excellence.',
    category: 'showcase',
    year: '2025',
    // Update image path here: Place your image in /public folder and use '/filename.jpg'
    image: '/Gemini_Generated_Image_mr7czrmr7czrmr7c.png',
    tags: ['Industry Recognition', 'Excellence', 'Lodha Group'],
    link: '#',
  }
];
