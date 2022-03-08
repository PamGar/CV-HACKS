import React from 'react';
import Layout from '../../layouts/navigation/index';
import CV from '../../components/cv_preview';
import Tasks from '../../components/tasks_list';

const CV_preview = () => {
  return <Layout main={<CV />} right={<Tasks />} />;
};

export default CV_preview;
