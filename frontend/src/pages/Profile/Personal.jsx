import { useGetProfileQuery, useUpdateUserMutation } from "../../store/userApiSlice";
import ProfileSkeleton from "../../components/skeleton/ProfileSkeleton";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from '../../store/authSlice';
import Loader from "../../components/Loader";
function Personal() {
	const { data: profileData, isLoading, isError } = useGetProfileQuery();
	const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();
	const dispatch = useDispatch();
	const submitHandler = async (e) => {
		e.preventDefault();
		const newUserData = {
			image: e.target.image?.value || profileData.image,
			name: e.target.name?.value || profileData.name,
			phoneNumber: e.target.phoneNumber?.value || profileData.phoneNumber,
			password: e.target.password.value
		};
		try {
			const res = await updateUser(newUserData).unwrap();
			dispatch(setCredentials({ ...res }));
			toast.success("Updated successfully");
		} catch (err) {
			toast.error(err.data.message);
		}
	};

	if (isLoading) return <ProfileSkeleton />;
	if (isError) return <div className="alert text-center py-2 my-10">Failed to get user data</div>;
	return (
		<section className="dark:bg-gray-900 overflow-y-scroll no-scrollbar h-full ">
			<div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
				<div
					className="w-full mx-auto shadow-2xl p-4 rounded-xl self-center dark:bg-gray-800/40">
					<form onSubmit={submitHandler}>
						<div className="relative rounded-full mx-auto w-32 h-32">
							<img className="rounded-full w-full h-full" src={profileData.image} alt="" />
							<div className="absolute bottom-2 right-2 bg-white/90 rounded-full w-6 h-6 text-center">
								<input type="file" name="image" id="upload_image" hidden />
								<label htmlFor="upload_image" className="cursor-pointer" >
									<svg data-slot="icon" className="w-6 h-5 text-blue-700" fill="none"
										strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
										<path strokeLinecap="round" strokeLinejoin="round"
											d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z">
										</path>
										<path strokeLinecap="round" strokeLinejoin="round"
											d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z">
										</path>
									</svg>
								</label>
							</div>
						</div>

						<div className="flex-col gap-2 justify-center w-full">
							<div className="w-full mb-4 mt-6">
								<label className="mb-2 dark:text-gray-300">Name</label>
								<input type="text"
									name="name"
									className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
									placeholder={profileData?.name} />
							</div>
							<div className="w-full mb-4 lg:mt-6">
								<label className=" dark:text-gray-300">Email</label>
								<input type="text"
									className="mt-2 p-4 w-full cursor-not-allowed border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
									placeholder={profileData?.email} disabled />
							</div>
							<div className="w-full mb-4 lg:mt-6">
								<label className="mb-2 dark:text-gray-300">Phone Number</label>
								<input type="text"
									name="phoneNumber"
									className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
									placeholder={profileData?.phoneNumber} />
							</div>

							<div className="w-full mb-4 lg:mt-6">
								<label className="mb-2 dark:text-gray-300">Password</label>
								<input type="password"
									required
									name="password"
									className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
									placeholder="Password" />
							</div>
						</div>

						<div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
							<button disabled={updateLoading} type="submit" className="w-full p-4">{
								updateLoading ? <Loader /> : "Submit"
							}</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}

export default Personal;
