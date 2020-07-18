const path = require('path');
const _ = require('lodash');


exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const postTemplate = path.resolve(`src/templates/post.js`);
  const tagTemplate = path.resolve('src/templates/tag.js');

  const result = await graphql(`
    {
      postsRemark: allContentfulBlogPosts(sort: {order: DESC, fields: date}) {
        edges {
          node {
            slug
          }
        }
      }
      tagsGroup: allContentfulBlogPosts {
        group(field: tags) {
          fieldValue
        }
      }
      
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

    // Create post detail pages
    const posts = result.data.postsRemark.edges;
    posts.forEach(({ node }) => {
      createPage({
        path: `blog/${node.slug}`,
        component: postTemplate,
        context: {
          slug: node.slug,
        },
      });
    });

     // Extract tag data from query
  const tags = result.data.tagsGroup.group;
  // Make tag pages
  tags.forEach(tag => {
    createPage({
      path: `/blog/tags/${_.kebabCase(tag.fieldValue)}/`,
      component: tagTemplate,
      context: {
        tag: tag.fieldValue,
      },
    });
  });
}
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    // https://www.gatsbyjs.org/docs/debugging-html-builds/#fixing-third-party-modules
    if (stage === 'build-html') {
      actions.setWebpackConfig({
        module: {
          rules: [
            {
              test: /scrollreveal/,
              use: loaders.null(),
            },
            {
              test: /animejs/,
              use: loaders.null(),
            },
          ],
        },
      });
    }
  
//     actions.setWebpackConfig({
//       resolve: {
//         alias: {
//           '@components': path.resolve(__dirname, 'src/components'),
//           '@config': path.resolve(__dirname, 'src/config'),
//           '@fonts': path.resolve(__dirname, 'src/fonts'),
//           '@images': path.resolve(__dirname, 'src/images'),
//           '@pages': path.resolve(__dirname, 'src/pages'),
//           '@styles': path.resolve(__dirname, 'src/styles'),
//           '@utils': path.resolve(__dirname, 'src/utils'),
//         },
//       },
//     });
//   };
}