import './singlepost.css';
import imageUrlBuilder from '@sanity/image-url';
import SyntaxHighlighter from 'react-syntax-highlighter';
import BlockContent from '@sanity/block-content-to-react';
import client from '../../Assets/sanityClient';

const SinglePost = ({ singleBlog }) => {
  //console.log(singleBlog, "singlepage nbolo");
  const builder = imageUrlBuilder(client);
  let blogDate = new Date(singleBlog.createdAt).toDateString();
  const serializers = {
    types: {
        code: ({node = {}}) => {
            const { code, language } = node
            if (!code){
                return null
            }
             return <SyntaxHighlighter language={language ||'text'} >
            {code}
          </SyntaxHighlighter>
        }},};

  function urlFor(source) {
    return builder.image(source)
  }

  return (
      <div className='single-post'>
        <div className='single-post-details'>
          <div className='single-post-author-image-wrapper'>
              <img
                  src="https://mdbootstrap.com/img/Photos/Avatars/img%20(32).jpg"
                  alt=""
                  className='single-page-img'
              />
          </div>
          <div className='single-post-author-details'>
            <h className='author-name'>shilash</h>
            <h className='single-post-blog-date'>{blogDate}</h>
          </div>
          <div className='single-post-social-icon'>
            <i class="fab fa-linkedin"></i>
            <i class="fab fa-github"></i>
            <i class="fab fa-twitter"></i>
          </div>
        </div>
        <div className={singleBlog.mainImage ? 'single-post-wrapper' : 'single-post-wrapper-without-image'}>
          <h1 className="single-post-heading">{singleBlog.slug.current}</h1>
          {singleBlog.mainImage ?  <img className='single-post-img'
            src={ singleBlog.mainImage.asset.url }
            alt="post-image"
            />  : <br></br>}
        </div>
        <div className="paragraph">
          <p className='single-post-body'>
            <BlockContent blocks={singleBlog.body} serializers={serializers} 
              projectId="dw4jvvdm"
              dataset='classline_production'
            />
          </p>
          <p>
            {blogDate}
          </p>
          <p>
            {singleBlog.name}
          </p>
      </div>
    </div>
  )
}

export default SinglePost;