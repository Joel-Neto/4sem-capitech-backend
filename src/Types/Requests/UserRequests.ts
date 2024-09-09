export interface AuthReqProps {
  email: string;
  password: string;
}

export interface AuthRegisterProps extends AuthReqProps {
  adminCode: string;
  name: string;
}

export interface IdProps {
  id: string;
}

export interface UpdateUserProps {
  email?: string;
  password?: string;
  name?: string;
}
