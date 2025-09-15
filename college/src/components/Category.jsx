import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MDBIcon } from 'mdb-react-ui-kit';
import './Category.css';

export default function Category() {
  const [collegeCounts, setCollegeCounts] = useState({});
const navigate= useNavigate();
  useEffect(() => {
    async function fetchCollegeCounts() {
      try {
        const categories = [
          'Engineering',
          'Management',
          'Medical',
          'Mass Communication',
          'Design',
          'Law',
          'Architecture',
          'Computers',
          'Arts and Humanities',
          'Commerce',
          'Science',
          'Hotel Management',
          'Education',
          'Pharmacy',
          'Travel and Tourism'
        ];

        const counts = {};
        for (const category of categories) {
          const response = await fetch(`https://marvelous-abundance-production.up.railway.app/categories/colleges?categoryName=${category}`);
          if (response.ok) {
            const data = await response.json();
            counts[category] = data;
          } else {
            console.error(`Failed to fetch college count for category: ${category}`);
          }
        }

        setCollegeCounts(counts);
      } catch (error) {
        console.error('Error fetching college counts:', error);
      }
    }

    fetchCollegeCounts();
  }, []); // Execute once on component mount
  const handleCategory = (e, event) => {
    event.preventDefault();
    navigate("/Colleges", { state: { categoryName: e } });
  }
  return (
    <div className='categories'>
      {Object.entries(collegeCounts).map(([category, count]) => (
        <Link key={category} onClick={(event) => handleCategory(category,event)} className='category-link'>
          {getCategoryIcon(category)}<br />
          {category} ({count})
        </Link>
      ))}
    </div>
  );
}

function getCategoryIcon(category) {
  switch (category.toLowerCase()) {
    case 'engineering':
      return <MDBIcon fas icon="cogs" size='2x' />;
    case 'management':
      return <MDBIcon fas icon="chart-line" size='2x' />;
    case 'medical':
      return <MDBIcon fas icon="briefcase-medical" size='2x' />;
    case 'mass communication':
      return <MDBIcon fas icon="film" size='2x' />;
    case 'design':
      return <MDBIcon fas icon="socks" size='2x' />;
    case 'law':
      return <MDBIcon fas icon="gavel" size='2x' />;
    case 'architecture':
      return <MDBIcon far icon="building" size='2x' />;
    case 'computers':
      return <MDBIcon fas icon="laptop" size='2x' />;
    case 'arts and humanities':
      return <MDBIcon fas icon="paint-brush" size='2x' />;
    case 'commerce':
      return <MDBIcon fas icon="hand-holding-usd" size='2x' />;
    case 'science':
      return <MDBIcon fas icon="atom" size='2x' />;
    case 'hotel management':
      return <MDBIcon fas icon="concierge-bell" size='2x' />;
    case 'education':
      return <MDBIcon fas icon="chalkboard-teacher" size='2x' />;
    case 'pharmacy':
      return <MDBIcon fas icon="flask" size='2x' />;
    case 'travel and tourism':
      return <MDBIcon fas icon="plane-departure" size='2x' />;
    default:
      return <MDBIcon fas icon="question-circle" size='2x' />;
  }
}
