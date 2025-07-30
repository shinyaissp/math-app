'use client'

import React, { useState, useEffect, useCallback } from 'react'
import styles from './page.module.css'
import 'katex/dist/katex.min.css'
import { BlockMath } from 'react-katex'
import DefaultButton from '@/components/Button/DefaultButton'
import AnswerButtons from '../components/AnswerButton'
import { problemsDeg } from '../constants/problemsDeg'
import { useTrigQuizContext } from '../contexts/TrigQuizContext'
import TimeAttack from '@/features/TimeAttack/TimeAttack'

export default function Page() {
  return (
    <>
      <TimeAttack>
        <AnswerButtons></AnswerButtons>
      </TimeAttack>
    </>
  )  
}
