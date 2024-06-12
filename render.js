import Handlebars from "handlebars";

const Render = (data, template) => {
  const compiled = Handlebars.compile(template);
  return compiled(data);
};

export default Render;
