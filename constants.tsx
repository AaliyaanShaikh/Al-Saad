
import { Project } from './types';

// Project data configuration
// To update images: Place your image files in the /public folder and reference them as '/filename.jpg'
// To update descriptions: Edit the description field for each project below
export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Luxury Villa Estate',
    description: 'Stunning 5-bedroom villa with panoramic views, modern amenities, and premium finishes in an exclusive neighborhood. Perfect for families seeking luxury living with spacious interiors and elegant design.',
    category: 'exclusive',
    year: '2024',
    // To use a local image: Place image in /public folder and use '/filename.jpg'
    // Example: image: '/IMG_4653.jpg'
    image: '/IMG_4653.jpg',
    tags: ['Luxury', 'Villa', 'Premium'],
    link: '#',
    location: 'Exclusive District',
    price: '$2.5M',
    beds: '5',
    sqft: '4,500'
  },
  {
    id: '2',
    title: 'Downtown Penthouse',
    description: 'Sophisticated penthouse apartment with city skyline views, high-end finishes, and premium location in the heart of the city. Ideal for professionals who appreciate urban luxury and convenience.',
    category: 'exclusive',
    year: '2024',
    // Update image path here: '/your-image-filename.jpg'
    image: '/ChatGPT Image Jan 13, 2026 at 02_30_41 AM.png',
    tags: ['Penthouse', 'Downtown', 'Modern'],
    link: '#',
    location: 'City Center',
    price: '$1.8M',
    beds: '3',
    sqft: '3,200'
  },
  {
    id: '3',
    title: 'Commercial Office Space',
    description: 'Prime commercial property ideal for businesses, featuring modern infrastructure and excellent connectivity. Perfect for startups and established companies looking for a prestigious address.',
    category: 'exclusive',
    year: '2024',
    // Update image path here: '/your-image-filename.jpg'
    image: '/ChatGPT Image Jan 13, 2026 at 02_37_17 AM.png',
    tags: ['Commercial', 'Office', 'Business'],
    link: '#',
    location: 'Business District',
    price: '$850K',
    beds: 'N/A',
    sqft: '5,000'
  },
  {
    id: '4',
    title: 'Waterfront Condominium',
    description: 'Elegant waterfront property with stunning views, premium amenities, and resort-style living experience. Experience tranquility and luxury in this beautifully designed condominium.',
    category: 'exclusive',
    year: '2023',
    // Update image path here: '/your-image-filename.jpg'
    image: '/Gemini_Generated_Image_quwm7uquwm7uquwm.jpeg',
    tags: ['Waterfront', 'Condo', 'Luxury'],
    link: '#',
    location: 'Waterfront',
    price: '$1.2M',
    beds: '2',
    sqft: '2,800'
  },
  {
    id: '5',
    title: 'Investment Property',
    description: 'High-yield investment opportunity with excellent rental potential and strong appreciation prospects. A smart choice for investors seeking long-term returns in a growing market.',
    category: 'archived',
    year: '2023',
    // Update image path here: '/your-image-filename.jpg'
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=90&w=1200',
    tags: ['Investment', 'Rental', 'ROI'],
    link: '#',
    location: 'Investment Zone',
    price: '$650K',
    beds: '4',
    sqft: '3,500'
  },
  {
    id: '6',
    title: 'Family Home',
    description: 'Spacious family home with multiple bedrooms, large garden, and family-friendly neighborhood. Perfect for growing families who value space, comfort, and community living.',
    category: 'archived',
    year: '2023',
    // Update image path here: '/your-image-filename.jpg'
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&q=90&w=1200',
    tags: ['Family', 'Spacious', 'Garden'],
    link: '#',
    location: 'Suburban',
    price: '$950K',
    beds: '4',
    sqft: '3,800'
  },
  {
    id: '7',
    title: 'Modern Apartment',
    description: 'Contemporary apartment with sleek design, smart home features, and prime urban location. Perfect for young professionals and couples seeking modern living in the city center.',
    category: 'archived',
    year: '2023',
    // Update image path here: '/your-image-filename.jpg'
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&q=90&w=1200',
    tags: ['Modern', 'Urban', 'Smart'],
    link: '#',
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
