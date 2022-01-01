/**
 * @fileoverview server element type
 */
export type ServerElementsType = {
  type?: string,
  name?: string,
  content?: string
};

export type ServerType = {
  serverName: string,
  serverContent: string,
  serverDescription?: string,
};
