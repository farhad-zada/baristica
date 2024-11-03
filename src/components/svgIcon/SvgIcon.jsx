const SvgIcon = ({ svgString }) => (
    <div dangerouslySetInnerHTML={{ __html: svgString }} />
);

export default SvgIcon;

