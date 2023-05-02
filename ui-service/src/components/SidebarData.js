export const SidebarData = [
  {
    title: "Iniciar Sesión",
    name: "login",
    path: "/login",
    roles: ["ADMIN", "medical_staff"],
  },
  {
    title: "Gestión de Usuarios",
    name: "users_list",
    path: "/users",
    roles: ["ADMIN"],
    subNav: [
      {
        title: "Registro de Usuarios",
        path: "/users/userRegister",
        roles: ["ADMIN"],
      },

      {
        title: "Usuarios del EMT",
        path: "/users/emtUsers",
        roles: ["ADMIN"],
      },
    ],
  },
  {
    title: "Gestión de Roles",
    name: "roles_list",
    path: "/roles",
    roles: ["ADMIN"],
    subNav: [
      {
        title: "Registro de Roles",
        path: "/roles/rolesRegister",
        roles: ["ADMIN"],
      },
      {
        title: "Roles del EMT",
        path: "/roles/emtRoles",
        roles: ["ADMIN"],
      },
    ],
  },
  {
    title: "Gestion de Pacientes",
    name: "pacients_list",
    path: "/patients",
    roles: ["ADMIN", "medical_staff", "nursing_staff"],
    subNav: [
      {
        title: "Registro de Pacientes",
        path: "/patients/patientRegister",
        roles: ["ADMIN", "medical_staff", "nursing_staff"],
      },

      {
        title: "Pacientes del EMT",
        path: "/patients/emtPatients",
        roles: ["ADMIN", "medical_staff", "nursing_staff"],
      },
    ],
  },
  {
    title: "Gestión de Historias Clínicas",
    path: "/clinicHistory",
    name: "clinic_history_list",
    roles: ["ADMIN", "medical_staff", "nursing_staff"],
    subNav: [
      {
        title: "Formatos de historias clínicas",
        path: "/clinicHistory/createClinicHistory",
        roles: ["ADMIN"],
      },
      {
        title: "Historias clínicas del sistema",
        path: "/clinicHistory/clinicHistoryFormats",
        roles: ["ADMIN", "medical_staff", "nursing_staff"],
      },
    ],
  },
  {
    title: "Soporte",
    path: "/support",
    name: "support",
    roles: ["ADMIN", "medical_staff", "nursing_staff", "administrative_staff"],
  },
  {
    title: "Cerrar Sesión",
    name: "logout",
    path: "/logout",
    roles: ["ADMIN", "medical_staff", "nursing_staff", "administrative_staff"],
  },
];
