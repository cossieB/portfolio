import { motion } from 'framer-motion';
import React, { useLayoutEffect, useRef } from 'react';
import styles from './2048.module.scss';
import { Block } from './Board';

export const numbers = new Array(16).fill(0).map((_, i) => i)

