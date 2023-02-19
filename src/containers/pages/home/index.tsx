import { Box } from '@mantine/core';
import { Layout } from '../../layout';
import { useStyles } from './styles';
import { HomeCards } from './home-cards';

export const Home = () => {
  const { classes } = useStyles();

  return (
    <Layout>
      <Box className={classes.container}>
        <HomeCards />
      </Box>
    </Layout>
  );
};
