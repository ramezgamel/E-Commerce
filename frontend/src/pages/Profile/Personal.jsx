import { useGetProfileQuery, useUpdateUserMutation } from "../../store/userApiSlice";
import ProfileSkeleton from "../../components/skeleton/ProfileSkeleton";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setCredentials } from '../../store/authSlice';
import Input from "../../components/form/Input";
import SubmitButton from "../../components/buttons/SubmitButton";
import ImageInput from "../../components/form/ImageInput";
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
			toast.error(err.data.message || err.data.msg);
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
						<ImageInput image={profileData.image} />
						<div className="flex-col gap-2 justify-center w-full">
							<Input name='name' label="Name" value={profileData?.name} />
							<Input name="email" label="E-mail" value={profileData?.email} disabled/>
							<Input name="phoneNumber" label="Phone Number" value={profileData?.phoneNumber} />
							<Input name="password" label="Password" type="password" required placeholder="*****" />
						</div>
						<SubmitButton btnName="Update" pending={updateLoading}/>
					</form>
				</div>
			</div>
		</section>
	);
}

export default Personal;
