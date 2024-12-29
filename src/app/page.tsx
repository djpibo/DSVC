'use client';

import { supabase } from '../lib/supabaseClient';
import { todos } from '../types/database';
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState<todos[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from('todos')
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setData(data || []);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="main-container">
      {/* 제목 */}
      <h1 className="main-title">
        Database Schema Validator/Converter
      </h1>
      <ul>
        {data.map((item) => (
          <li key={item.task}>{item.is_done}</li>
        ))}
      </ul>
    </main>
  );
}
