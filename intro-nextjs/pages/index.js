/**
 * @fileoverview your-domain.com
 */
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A first meetup',
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352',
    address: '123 Some Street, Some City',
    description: 'This is a first meetup',
  },
  {
    id: 'm2',
    title: 'A second meetup',
    image: 'https://images.unsplash.com/photo-1495521821757-a1efb6729352',
    address: '123 Some Street, Some City',
    description: 'This is a second meetup',
  },
];

function HomePage() {
  return (
    <MeetupList meetups={DUMMY_MEETUPS}></MeetupList>
  );
}

export default HomePage;
