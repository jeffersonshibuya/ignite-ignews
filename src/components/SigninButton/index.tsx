import React from 'react';
import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { signIn, signOut, useSession } from 'next-auth/client'

import styles from './styles.module.scss';

export const SigninButton: React.FC = () => {
  const [session] = useSession();

  return session 
  ? (
    <button 
      type="button" 
      className={styles.signInButton} 
      onClick={() => signOut()}
    >
      {/* <FaGithub color="#04b361"/> */}
      <img src={session.user.image} alt="user" width="24" height="24"/>
      {session.user.name}
      <FiX color="#737388" className={styles.closeIcon} />
    </button>
  )
  : (
    <button 
      type="button" 
      className={styles.signInButton} 
      onClick={() => signIn('github')}
    >
      <FaGithub color="#eba417"/>
      Sign In with Github
    </button>
  )
}