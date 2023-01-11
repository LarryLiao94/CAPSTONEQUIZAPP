import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import DefaultLayout from '../components/layouts/default-layout'
import QuizList from '../components/Quizzes/QuizList'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
   <DefaultLayout>
    <p className='text-3xl'>
      This is our home page
    </p>

    <QuizList />
   </DefaultLayout>
  )
}
