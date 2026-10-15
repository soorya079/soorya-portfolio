/**
 * Central social links configuration.
 * Only verified links are shown. Add future links here.
 */
export const socialLinks = {
  github: {
    label: 'GitHub',
    url: 'https://github.com/soorya079',
    username: 'soorya079',
    visible: true,
  },
  linkedin: {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/in/soorya-m-9835bb362/',
    username: 'soorya-m-9835bb362',
    visible: true,
  },
  email: {
    label: 'Email',
    url: 'mailto:sooryamathanagopal07@gmail.com',
    visible: true,
  },
  phone: {
    label: 'Mobile',
    url: 'tel:9843729832',
    visible: true,
  },
  resume: {
    label: 'Resume',
    url: '/Soorya_M_AWS_Cloud_Engineer_Resume.pdf',
    downloadName: 'Soorya_M_AWS_Cloud_Engineer_Resume.pdf',
    visible: true,
  },
  // Future social links — add and set visible: true when verified
  // twitter: { label: 'X / Twitter', url: '', visible: false },
  // instagram: { label: 'Instagram', url: '', visible: false },
};

export const visibleLinks = Object.values(socialLinks).filter((l) => l.visible);
