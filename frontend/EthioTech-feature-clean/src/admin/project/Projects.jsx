import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { fetchProject, removeProject } from '../../redux/project/projectSlice';
import { projectSelector } from '../../redux/store';
import { useDeleteProjectMutation } from '../../redux/project/projectApiSlice';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { MdReadMore } from 'react-icons/md';
import LoadingScreen from '../../conditions/LoadingScreen';
import ButtonLoadingScreen from '../../conditions/ButtonLoadingScreen';

export default function Projects() {
  const dispatch = useDispatch();
  const [deleteProject, { isLoading: loading }] = useDeleteProjectMutation();
  const { projects, isLoading } = useSelector(projectSelector);
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const [open, setOpen] = useState(null);

  const handleOpenModal = (id) => {
    setOpen(id);
  };

  const handleCloseModal = () => {
    setOpen(null);
  };

  useEffect(() => {
    if (projects.length === 0) {
      dispatch(fetchProject());
    }
  }, [dispatch, projects.length]);

  const handleDelete = async (id) => {
    try {
      console.log(id);
      const res = await deleteProject(id).unwrap();
      setOpen(null);
      if (res.message === 'Project deleted successfully') {
        dispatch(removeProject(id));
        toast.success('you have successfully deleted a Project');
      }
    } catch (error) {
      if (error.status === 400) {
        toast.error('User cannot be deleted');
      } else {
        toast.error('something went wrong');
      }
      console.log(error);
    }
  };

  let content;
  let filteredProject;
  if (isLoading) {
    content = <LoadingScreen />;
  } else if (!isLoading && projects.length > 0) {
    filteredProject = projects.filter((project) => project.title.toLowerCase().includes(searchInput.toLowerCase()));
    content = (
      <section className="lg:pt-[30px]  pt-6 pb-12 lg:pb-[0px]">
        <div className="container">
          <div className="flex flex-wrap px-6 pb-6 gap-x-6 gap-y-10 md:gap-0 -mx-2">
            {filteredProject.length === 0 ? <h1 className="text-center text-2xl font-semibold">No Project Found</h1>
              : filteredProject.map((item) => (
                <div className="w-full md:w-1/2 md:mt-4 lg:w-1/3  px-4" key={item.id}>
                  <div
                    className="
    p-4
    h-72
    md:px-7
    xl:px-10
    bg-white
    hover:shadow-lg
    border
    transition duration-300 ease-in-out
    flex
    flex-col
    justify-center
    relative
    hover:drop-shadow-xl rounded-lg shadow-lg overflow-hidden
  "
                  >
                    <div className="absolute top-2 right-2 text-lg" type="button">
                      <div className="flex gap-2">
                        <Link className="text-green-300 text-xl" to={`/admin/projectDetail/${item.id}`} title="View Details">
                          <MdReadMore />
                        </Link>
                        <Link className="text-blue-300" to={`/admin/updateProject/${item.id}`} title="Edit Project">
                          <AiFillEdit />
                        </Link>
                        <button className="text-red-600" type="button" onClick={() => handleOpenModal(item.id)} title="Delete Project">
                          <AiFillDelete />
                        </button>
                        <Modal open={open === item.id} onClose={handleCloseModal} center>
                          <div className="flex flex-col gap-1 pt-7">
                            <h2>Are you sure you whan to delete</h2>
                            <p>
                              Project:
                              {' '}
                              {item.title}
                            </p>
                            <div className="flex gap-2 mt-2 justify-start items-center">
                              <button className="bg-red-500 flex gap-2 justify-center items-center text-white px-4 py-1 rounded-md" onClick={() => handleDelete(open)} type="button">
                                {loading ? <ButtonLoadingScreen /> : ''}
                                <span>delete</span>
                              </button>
                              <button className="bg-mainColor text-white px-4 py-1 rounded-md" onClick={handleCloseModal} type="button">cancle</button>
                            </div>
                          </div>
                        </Modal>
                      </div>
                    </div>
                    <h4 className="font-semibold font-raleway text-2xl text-dark mb-3 break-words  my-2 line-clamp-2">
                      {item.title}
                    </h4>
                    <div className="w-1/3 h-1.5 bg-secondColor mb-4" />
                    <p className="text-body-color text-sm font-poppins break-words text-body-color line-clamp-5 leading-6">
                      {item.body}
                    </p>
                  </div>
                </div>

              ))}
          </div>
        </div>
      </section>
    );
    console.log(projects);
  }

  return (
    <div className="flex flex-col h-auto overflow-x-hidden py-10">
      <div className="flex justify-between items-center px-8">
        <div>
          <div className="mt-1 relative lg:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-mainColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <input type="text" name="email" id="topbar-search" className="bg-gray-50 border border-mainColor text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full pl-10 px-2.5 py-2" placeholder="Search" value={searchInput} onChange={handleSearchInput} />
          </div>
        </div>
        <Link to="/admin/addProject" className="px-12 pb-2 pt-1 rounded-md bg-mainColor text-white lg:w-56 w-52 ml-3 mb-1">Add New Project</Link>
      </div>
      <div>
        {content}
      </div>
    </div>
  );
}



