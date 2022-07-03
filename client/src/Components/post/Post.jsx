import './post.css';
import { Link } from 'react-router-dom';
import React from 'react';
import BlockContent from '@sanity/block-content-to-react';
import {PortableText} from '@portabletext/react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import imageUrlBuilder from '@sanity/image-url';
import client from '../../Assets/sanityClient';


export default function Post({ blogpost }) {
  const builder = imageUrlBuilder(client)
  let blogDate = new Date(blogpost.createdAt).toDateString();
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
        }
    }
}
  function urlFor(source) {
    return builder.image(source)
  }
  
  return (
    <div className="cards">
      <div className='card-img-wrapper'>
          <img 
              className='card-img'
              src={blogpost.mainImage ?  blogpost.mainImage.asset.url : ""}
              alt=""
          />
      </div>
      <div className='blog-details-wrapper'>
        <Link style={{color: "black"}} to={`/post/${blogpost.slug.current}`}>
          <h3 className='blog-title'>
            {blogpost.title} 
          </h3>
        </Link>
        <div className='blog-desc-wrapper'>
          <p className='blog-desc'>
            <BlockContent blocks={blogpost.body} serializers={serializers} />
          </p>
        </div>
      </div>
      <div className='blog-footer'>
          <div className='blog-footer-categories'>
            {blogpost.categories.map(category => (
              <Link to={`/?category=${category}`}>
                <h className="blog-footer-category" key={blogpost.category}>{category}</h>
              </Link>
            ))}

          </div>
          <div className="blog-details-footer">
            <div className='blog-footer-image-wrapper'>
            <img
                src={urlFor(blogpost.authorImage).url()}
                alt=""
                className='blog-footer-img'
            />
             
            </div>
            <div className='blog-footer-author-name'>
              <Link to={`/?username=${blogpost.authorName}`}>
                <h className="blog-footer-author">{blogpost.authorName}</h>
              </Link>
              <p className='blog-footer-date'>
                {
                  blogDate
                }
              </p>
            </div>
          </div>
        </div>
      
      </div>
 
  )
}
            
        





            

        
  