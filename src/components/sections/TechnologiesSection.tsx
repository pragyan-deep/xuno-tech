'use client'

import React, { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'

interface TechnologiesSectionProps {
  className?: string
}

// Comprehensive technology data organized by categories
const technologies = [
  // Frontend Technologies
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'Frontend',
    description: 'Full-stack React framework with server-side rendering and static generation',
    proficiency: 95,
    experienceYears: 4,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747C19.746 4.347 17.18 1.062 13.405.264a12.56 12.56 0 0 0-1.833-.264z"/>
      </svg>
    ),
    color: 'from-gray-800 to-black',
    uses: ['Web Applications', 'E-commerce', 'Enterprise Solutions', 'Static Sites']
  },
  {
    id: 'react',
    name: 'React',
    category: 'Frontend',
    description: 'Component-based JavaScript library for building user interfaces',
    proficiency: 93,
    experienceYears: 5,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.866.728-.064 1.466-.099 2.21-.099zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.014 1.36-.034-.44.572-.895 1.095-1.36 1.56-.465-.467-.92-.985-1.36-1.56z"/>
      </svg>
    ),
    color: 'from-cyan-400 to-blue-500',
    uses: ['Single Page Apps', 'Component Libraries', 'Interactive UIs', 'Mobile Apps']
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Frontend',
    description: 'Typed superset of JavaScript that compiles to plain JavaScript',
    proficiency: 91,
    experienceYears: 4,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.213.776.213 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/>
      </svg>
    ),
    color: 'from-blue-600 to-blue-800',
    uses: ['Type Safety', 'Large Applications', 'Team Development', 'Code Quality']
  },
  
  // Backend Technologies
  {
    id: 'nodejs',
    name: 'Node.js',
    category: 'Backend',
    description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine',
    proficiency: 89,
    experienceYears: 4,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.570,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"/>
      </svg>
    ),
    color: 'from-green-500 to-green-700',
    uses: ['REST APIs', 'GraphQL', 'Microservices', 'Real-time Apps']
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Backend',
    description: 'High-level programming language with extensive libraries',
    proficiency: 87,
    experienceYears: 3,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"/>
      </svg>
    ),
    color: 'from-yellow-400 to-blue-500',
    uses: ['AI/ML', 'Data Analysis', 'Web APIs', 'Automation']
  },
  
  // Cloud & DevOps
  {
    id: 'aws',
    name: 'Amazon Web Services',
    category: 'Cloud & DevOps',
    description: 'Comprehensive cloud computing platform and services',
    proficiency: 85,
    experienceYears: 3,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335c-.072.048-.144.071-.2.071-.08 0-.16-.04-.239-.112a2.729 2.729 0 0 1-.287-.375 6.94 6.94 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.383-.591-.894-.591-1.533 0-.678.239-1.23.718-1.644.48-.415 1.118-.623 1.923-.623.264 0 .535.024.823.064.287.048.583.112.886.2v-.647c0-.671-.087-1.133-.263-1.381-.184-.255-.559-.383-1.133-.383-.24 0-.487.032-.742.088-.255.056-.51.135-.758.224-.112.048-.2.08-.24.096-.047.016-.08.024-.112.024-.096 0-.144-.071-.144-.215v-.335c0-.112.016-.2.056-.255.04-.056.112-.112.2-.16.248-.127.543-.232.894-.32a4.39 4.39 0 0 1 1.067-.127c.83 0 1.436.191 1.842.574.391.383.591.958.591 1.732v2.282zm-3.218 1.214c.255 0 .527-.048.815-.135.287-.087.543-.255.75-.471.128-.137.224-.296.264-.479.048-.184.08-.399.08-.647v-.311a5.744 5.744 0 0 0-.695-.16 5.899 5.899 0 0 0-.726-.048c-.519 0-.902.104-1.15.31-.248.208-.375.498-.375.879 0 .36.095.623.279.806.184.191.454.279.758.279v.007zm6.218-.08c-.128 0-.215-.024-.279-.08-.063-.048-.119-.16-.167-.311L7.215 5.339c-.048-.16-.08-.263-.08-.32 0-.128.064-.2.191-.2h.783c.135 0 .226.024.272.08.064.048.112.16.16.311l1.542 6.073 1.43-6.073c.04-.16.087-.263.151-.311.064-.056.167-.08.263-.08h.638c.135 0 .226.024.279.08.063.048.119.16.151.311l1.446 6.153L15.814 5.18c.048-.16.104-.263.16-.311.063-.056.151-.08.271-.08h.742c.128 0 .2.064.2.2 0 .04-.008.08-.016.127-.008.048-.024.112-.056.2l-2.054 6.534c-.048.16-.104.263-.167.311-.064.056-.151.08-.279.08h-.695c-.135 0-.226-.024-.279-.08-.064-.048-.119-.16-.151-.311L12.062 6.299 10.636 11.85c-.032.16-.087.263-.151.311-.064.056-.159.08-.279.08h-.695zm9.357.24c-.375 0-.758-.08-1.142-.239-.383-.16-.67-.335-.862-.526-.096-.096-.16-.2-.184-.296-.024-.096-.04-.2-.04-.32v-.335c0-.144.056-.215.151-.215.048 0 .096.008.151.032.056.024.135.064.215.104.319.160.648.279.99.36.34.08.68.12 1.004.12.536 0 .95-.096 1.237-.287.287-.192.431-.462.431-.815 0-.24-.08-.447-.231-.615-.16-.168-.454-.32-.886-.455l-1.27-.399c-.647-.2-1.117-.494-1.405-.886-.287-.391-.431-.830-.431-1.317 0-.383.08-.718.248-1.005.167-.287.383-.526.646-.718.264-.191.566-.336.918-.415.352-.087.718-.127 1.084-.127.167 0 .34.016.51.032.174.016.335.048.494.08.151.04.295.08.431.127.135.048.247.096.335.16.087.055.151.119.191.2.048.08.071.175.071.279v.319c0 .144-.055.224-.151.224-.056 0-.151-.024-.271-.08a4.49 4.49 0 0 0-1.197-.336c-.479 0-.862.08-1.141.248-.287.167-.423.415-.423.75 0 .24.087.455.264.632.176.176.503.36.974.535l1.246.399c.631.2 1.086.479 1.357.838.271.36.407.767.407 1.23 0 .391-.08.742-.231 1.045-.16.303-.374.566-.65.774-.271.215-.599.375-.966.479-.375.111-.758.167-1.157.167l-.056-.016z"/>
      </svg>
    ),
    color: 'from-orange-400 to-orange-600',
    uses: ['Cloud Hosting', 'Serverless Functions', 'Database Services', 'CDN']
  },
  {
    id: 'docker',
    name: 'Docker',
    category: 'Cloud & DevOps',
    description: 'Platform for developing, shipping, and running applications in containers',
    proficiency: 82,
    experienceYears: 3,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.186m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.030-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"/>
      </svg>
    ),
    color: 'from-blue-400 to-blue-600',
    uses: ['Containerization', 'Microservices', 'Development Environment', 'Deployment']
  },
  
  // AI/ML Technologies
  {
    id: 'tensorflow',
    name: 'TensorFlow',
    category: 'AI/ML',
    description: 'End-to-end open source platform for machine learning',
    proficiency: 78,
    experienceYears: 2,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.168 3.564c.015-1.781.015-3.893.015-5.311zm21.708 5.311l-3.959-2.378c-.015-1.781-.015-3.893-.015-5.311L9.78 9.185v4.956l4.095 2.378c.015-1.781.015-3.893.015-5.311l6.168 3.564zM9.78 24l4.095-2.378V7.603l6.168 3.564c-.015-1.781-.015-3.893-.015-5.311L9.78 12.167z"/>
      </svg>
    ),
    color: 'from-orange-500 to-red-500',
    uses: ['Deep Learning', 'Neural Networks', 'Computer Vision', 'NLP']
  },
  {
    id: 'pytorch',
    name: 'PyTorch',
    category: 'AI/ML',
    description: 'Open source machine learning framework based on the Torch library',
    proficiency: 75,
    experienceYears: 2,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.005 0L4.952 7.053c-2.756 2.756-2.756 7.237 0 9.993s7.237 2.756 9.993 0c2.756-2.756 2.756-7.237 0-9.993L12.005 4.109V0zm-.5 4.109v2.946l-.9-.9c-1.798-1.798-4.713-1.798-6.511 0s-1.798 4.713 0 6.511 4.713 1.798 6.511 0l2.4-2.4V4.109z"/>
      </svg>
    ),
    color: 'from-red-500 to-orange-500',
    uses: ['Research', 'Prototyping', 'Computer Vision', 'Dynamic Computation']
  },
  
  // Design Tools
  {
    id: 'figma',
    name: 'Figma',
    category: 'Design',
    description: 'Collaborative interface design tool',
    proficiency: 88,
    experienceYears: 4,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.354-3.02-3.019-3.02h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.015-4.49-4.491S5.672 0 8.148 0h4.587v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.02s1.354 3.019 3.019 3.019h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.587v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117v-6.038H8.148zm7.704 0c-2.476 0-4.49 2.015-4.49 4.491s2.014 4.49 4.49 4.49 4.49-2.015 4.49-4.49-2.014-4.491-4.49-4.491zm0 7.51c-1.665 0-3.019-1.355-3.019-3.019s1.354-3.019 3.019-3.019 3.019 1.355 3.019 3.019-1.355 3.019-3.019 3.019zM8.148 24c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49 4.49 2.014 4.49 4.49S10.624 24 8.148 24zm0-7.51c-1.665 0-3.019 1.355-3.019 3.02S6.483 22.529 8.148 22.529s3.019-1.354 3.019-3.019-1.355-3.02-3.019-3.02z"/>
      </svg>
    ),
    color: 'from-purple-500 to-pink-500',
    uses: ['UI Design', 'Prototyping', 'Design Systems', 'Collaboration']
  },
  
  // Mobile Development
  {
    id: 'react-native',
    name: 'React Native',
    category: 'Mobile',
    description: 'Framework for building native apps using React',
    proficiency: 86,
    experienceYears: 3,
    icon: (
      <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.36-.034-.47 0-.92.014-1.36.034.44-.572.895-1.096 1.36-1.564zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.866.728-.064 1.466-.099 2.21-.099zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.36.034.47 0 .92-.014 1.36-.034-.44.572-.895 1.095-1.36 1.56-.465-.467-.92-.985-1.36-1.56z"/>
      </svg>
    ),
    color: 'from-cyan-400 to-blue-500',
    uses: ['iOS Apps', 'Android Apps', 'Cross-platform', 'Mobile UIs']
  }
]

const categories = ['All', 'Frontend', 'Backend', 'Cloud & DevOps', 'AI/ML', 'Design', 'Mobile']

export function TechnologiesSection({ className }: TechnologiesSectionProps) {
  const [activeCategory, setActiveCategory] = useState('All')

  // Filter technologies based on active category
  const filteredTechnologies = useMemo(() => {
    if (activeCategory === 'All') return technologies
    return technologies.filter(tech => tech.category === activeCategory)
  }, [activeCategory])

  // Get proficiency level text and color
  const getProficiencyInfo = (proficiency: number) => {
    if (proficiency >= 90) return { level: 'Expert', color: 'text-green-600' }
    if (proficiency >= 80) return { level: 'Advanced', color: 'text-blue-600' }
    if (proficiency >= 70) return { level: 'Intermediate', color: 'text-yellow-600' }
    return { level: 'Beginner', color: 'text-gray-600' }
  }

  return (
    <section 
      id="technologies" 
      className={cn(
        "py-24 bg-background relative overflow-hidden",
        className
      )}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container-max section-padding relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="animate-fade-in-up">
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-medium rounded-full mb-6">
              Our Tech Stack
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6">
              Modern Technologies 
              <span className="gradient-text block">We Master</span>
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              We stay ahead of the curve with the latest technologies and tools, 
              ensuring your projects are built with cutting-edge solutions that scale.
            </p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 animate-fade-in-up [animation-delay:200ms]">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300",
                "hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "bg-background/50 backdrop-blur-sm border border-border/50 text-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Technologies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {filteredTechnologies.map((tech, index) => {
            const proficiencyInfo = getProficiencyInfo(tech.proficiency)
            
            return (
              <div
                key={tech.id}
                className={cn(
                  "group glass-effect rounded-2xl p-6 transition-all duration-500 hover:scale-105 hover:shadow-glow animate-fade-in-up"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Technology Icon */}
                <div className={cn(
                  "w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto transition-all duration-300",
                  "bg-gradient-to-br", tech.color,
                  "group-hover:scale-110 group-hover:shadow-lg"
                )}>
                  <div className="text-white">
                    {tech.icon}
                  </div>
                </div>

                {/* Technology Content */}
                <div className="text-center">
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {tech.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {tech.description}
                  </p>

                  {/* Proficiency & Experience */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-center">
                      <div className={cn("text-sm font-semibold", proficiencyInfo.color)}>
                        {proficiencyInfo.level}
                      </div>
                      <div className="text-xs text-muted-foreground">{tech.proficiency}% Proficiency</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm font-semibold text-info">{tech.experienceYears}+ Years</div>
                      <div className="text-xs text-muted-foreground">Experience</div>
                    </div>
                  </div>

                  {/* Proficiency Bar */}
                  <div className="mb-4">
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-1000"
                        style={{ width: `${tech.proficiency}%` }}
                      />
                    </div>
                  </div>

                  {/* Use Cases */}
                  <div>
                    <h4 className="text-xs font-semibold text-foreground mb-2">Primary Uses:</h4>
                    <div className="flex flex-wrap gap-1">
                      {tech.uses.slice(0, 2).map((use) => (
                        <span key={use} className="px-2 py-1 bg-muted/50 text-muted-foreground text-xs rounded-md">
                          {use}
                        </span>
                      ))}
                      {tech.uses.length > 2 && (
                        <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md font-medium">
                          +{tech.uses.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Technology Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 animate-fade-in-up [animation-delay:400ms]">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">{technologies.length}+</div>
            <div className="text-sm text-muted-foreground">Technologies</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-success mb-2">
              {Math.round(technologies.reduce((acc, tech) => acc + tech.proficiency, 0) / technologies.length)}%
            </div>
            <div className="text-sm text-muted-foreground">Avg Proficiency</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-info mb-2">
              {Math.round(technologies.reduce((acc, tech) => acc + tech.experienceYears, 0) / technologies.length)}+
            </div>
            <div className="text-sm text-muted-foreground">Avg Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-warning mb-2">{categories.length - 1}</div>
            <div className="text-sm text-muted-foreground">Categories</div>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="animate-fade-in-up [animation-delay:600ms]">
          <div className="glass-effect rounded-2xl p-8 lg:p-12 text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Need a Specific Technology?
            </h3>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Don&apos;t see the technology you need? We&apos;re always learning and adapting. 
              Let&apos;s discuss your specific requirements and find the perfect solution.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                className="group inline-flex items-center justify-center rounded-xl bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-soft transition-all hover:bg-primary/90 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transform hover:scale-105 active:scale-95"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  })
                }}
              >
                Discuss Your Tech Needs
                <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              
              <button 
                className="group inline-flex items-center justify-center rounded-xl border border-input bg-background px-8 py-4 text-base font-medium shadow-soft transition-all hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 transform hover:scale-105 active:scale-95"
                onClick={() => {
                  document.getElementById('services')?.scrollIntoView({ 
                    behavior: 'smooth' 
                  })
                }}
              >
                View Our Services
                <svg className="ml-2 w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 