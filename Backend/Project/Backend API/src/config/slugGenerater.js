const generateUniqueSlug = async (Model, baseSlug) => {
  let slug = baseSlug;
  let count = 0;

  // Loop to find unique slug
  while (await Model.findOne.call(Model,
    { 
      slug : slug,
      deleted_at : null
    }
  )) {
    count++;
    slug = `${baseSlug}-${count}`;
  }

  return slug;
};

module.exports = { generateUniqueSlug }