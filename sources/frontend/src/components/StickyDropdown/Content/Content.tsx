export interface ContentProps extends React.PropsWithChildren<{}> {
}
  
const ContentSubComponent = (props: ContentProps) => {
    return props.children;
};

export default ContentSubComponent;