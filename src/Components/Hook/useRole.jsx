import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';


const useRole = () => {
      const { user } = useAuth();
    // console.log(user?.email)
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin, isPending: isAdminLoading, error } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/admin/${user?.email}`);
            console.log(res.data);
            return res.data?.admin;
        }
    })
    return [isAdmin, isAdminLoading, error]
};

export default useRole;


// const useRole = () => {
//     const { user } = useAuth();
//     // console.log(user?.email)
//     const axiosSecure = useAxiosSecure();
//     const { data: isAdmin, isPending: isAdminLoading, error } = useQuery({
//         queryKey: [user?.email, 'isAdmin'],
//         enabled: !!user?.email,
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users/admin/${user?.email}`);
//             console.log(res.data);
//             return res.data?.admin;
//         }
//     })
//     return [isAdmin, isAdminLoading, error]
// };

// export default useRole;


// import { useQuery } from '@tanstack/react-query';
// import useAuth from './useAuth';
// import useAxiosSecure from './useAxiosSecure';

// const useRole = () => {
//     const { user } = useAuth();
//     const axiosSecure = useAxiosSecure();

//     const { data: roleData, isLoading: isRoleLoading, error } = useQuery({
//         queryKey: [user?.email, 'role'],
//         enabled: !!user?.email,
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users/${user?.email}`);
//             return res.data;
//         }
//     });

//     const isAdmin = roleData?.admin || false;
//     const isModerator = roleData?.moderator || false;

//     return [isAdmin, isModerator, isRoleLoading, error];
// };

// export default useRole;
