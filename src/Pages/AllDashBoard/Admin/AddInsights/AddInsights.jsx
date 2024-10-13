import React, { useState, useContext } from 'react';
import { AuthContext } from '../../../../Provider/AuthProvider';


const AddInsights = () => {
    const { user } = useContext(AuthContext);

    // // State variables for each rich text editor
    // const [blogTitle1Phrase, setBlogTitle1Phrase] = useState('');
    // const [blogTitle2Phrase, setBlogTitle2Phrase] = useState('');
    // const [blogTitle3Phrase, setBlogTitle3Phrase] = useState('');
    // const [blogTitle4Phrase, setBlogTitle4Phrase] = useState('');
    // const [faqPhrase, setFaqPhrase] = useState('');
    // const [blogPhrase, setBlogPhrase] = useState('');

    // // Tiptap editor instances
    // const blogTitle1Editor = useEditor({
    //     extensions: [StarterKit],
    //     content: blogTitle1Phrase,
    //     onUpdate: ({ editor }) => setBlogTitle1Phrase(editor.getHTML()),
    // });

    // const blogTitle2Editor = useEditor({
    //     extensions: [StarterKit],
    //     content: blogTitle2Phrase,
    //     onUpdate: ({ editor }) => setBlogTitle2Phrase(editor.getHTML()),
    // });

    // const blogTitle3Editor = useEditor({
    //     extensions: [StarterKit],
    //     content: blogTitle3Phrase,
    //     onUpdate: ({ editor }) => setBlogTitle3Phrase(editor.getHTML()),
    // });

    // const blogTitle4Editor = useEditor({
    //     extensions: [StarterKit],
    //     content: blogTitle4Phrase,
    //     onUpdate: ({ editor }) => setBlogTitle4Phrase(editor.getHTML()),
    // });

    // const faqEditor = useEditor({
    //     extensions: [StarterKit],
    //     content: faqPhrase,
    //     onUpdate: ({ editor }) => setFaqPhrase(editor.getHTML()),
    // });

    // const blogEditor = useEditor({
    //     extensions: [StarterKit],
    //     content: blogPhrase,
    //     onUpdate: ({ editor }) => setBlogPhrase(editor.getHTML()),
    // });

    // const handleAddFormData = (event) => {
    //     event.preventDefault();
    //     const form = event.target;

    //     const formData = {
    //         metaDescription: form.metaDescription.value,
    //         industry: form.industry.value,
    //         filterCardImage: form.filterCardImage.value,
    //         blogMainTitle: form.blogMainTitle.value,
    //         blogTitlePhrase: form.blogTitlePhrase.value,
    //         featuredTopicsCategories: form.featuredTopicsCategories.value,
    //         industriesCategories: form.industriesCategories.value,
    //         capabilitiesCategories: form.capabilitiesCategories.value,
    //         blogImageForHeaderInside: form.blogImageForHeaderInside.value,
    //         blogImageInside: form.blogImageInside.value,
    //         imageAltText: form.imageAltText.value,
    //         blogPhrase,
    //         faqTitle1: form.faqTitle1.value,
    //         faqPhrase,
    //         blogTitle1: form.blogTitle1.value,
    //         blogTitle1Phrase,
    //         blogTitle2: form.blogTitle2.value,
    //         blogTitle2Phrase,
    //         blogTitle3: form.blogTitle3.value,
    //         blogTitle3Phrase,
    //         blogTitle4: form.blogTitle4.value,
    //         blogTitle4Phrase,
    //         user: user.email,
    //     };

    //     console.log('Form Data:', formData);
    // };

    return (
        <div className='container mx-auto my-5'>
            <h2>Add Insights</h2>
            {/* <form onSubmit={handleAddFormData} className='grid grid-cols-1 md:grid-cols-2 gap-5'>
                <label>Meta Description
                    <input type="text" name="metaDescription" className='w-full' />
                </label>

                <label>Industry
                    <input type="text" name="industry" className='w-full' />
                </label>

                <label>Filter Card Image
                    <input type="text" name="filterCardImage" className='w-full' />
                </label>

                <label>Blog Main Title
                    <input type="text" name="blogMainTitle" className='w-full' />
                </label>

                <label>Blog Title Phrase
                    <input type="text" name="blogTitlePhrase" className='w-full' />
                </label>

                <label>Featured Topics Categories (comma separated)
                    <input type="text" name="featuredTopicsCategories" className='w-full' />
                </label>

                <label>Industries Categories (comma separated)
                    <input type="text" name="industriesCategories" className='w-full' />
                </label>

                <label>Capabilities Categories (comma separated)
                    <input type="text" name="capabilitiesCategories" className='w-full' />
                </label>

                <label>Blog Image For Header Inside
                    <input type="text" name="blogImageForHeaderInside" className='w-full' />
                </label>

                <label>Blog Image Inside
                    <input type="text" name="blogImageInside" className='w-full' />
                </label>

                <label>Image Alt Text
                    <input type="text" name="imageAltText" className='w-full' />
                </label>

                <label className='tiptap'>Blog Phrase  
                    <MenuBar className="tiptap" editor={blogEditor} />
                    <EditorContent editor={blogEditor} className='tiptap border p-2' />
                </label>

                <label>FAQ Title 1
                    <input type="text" name="faqTitle1" className='w-full' />
                </label>

                <label className='tiptap'>FAQ Phrase
                    <EditorContent editor={faqEditor} className='tiptap border p-2' />
                </label>

                <label>Blog Title 1
                    <input type="text" name="blogTitle1" className='w-full' />
                </label>

                <label className='tiptap'>Blog Title 1 Phrase
                    <EditorContent editor={blogTitle1Editor} className='tiptap border p-2' />
                </label>

                <label>Blog Title 2
                    <input type="text" name="blogTitle2" className='w-full' />
                </label>

                <label className='tiptap'>Blog Title 2 Phrase
                    <EditorContent editor={blogTitle2Editor} className='tiptap border p-2' />
                </label>

                <label>Blog Title 3
                    <input type="text" name="blogTitle3" className='w-full' />
                </label>

                <label className='tiptap'>Blog Title 3 Phrase
                    <EditorContent editor={blogTitle3Editor} className='tiptap border p-2' />
                </label>

                <label>Blog Title 4
                    <input type="text" name="blogTitle4" className='w-full' />
                </label>

                <label className='tiptap'>Blog Title 4 Phrase
                    <EditorContent editor={blogTitle4Editor} className='tiptap border p-2' />
                </label>

                <button type="submit" className='mt-4'>Submit</button>
            </form> */}
        </div>
    );
};

export default AddInsights;
