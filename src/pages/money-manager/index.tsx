import type { GetStaticProps } from 'next'

// eslint-disable-next-line
export default () => {}

export const getStaticProps: GetStaticProps = () => {
  return {
    redirect: {
      permanent: false,
      destination: '/money-manager/project'
    }
  }
}
