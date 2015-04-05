class AppointmentsController < ApplicationController
	def create
		@appointment = Appointment.new(appointment_params)
		if @appointment.save
			render json: { status: 'success' }
			Notification.new({
				sender_id: current_user.id,
				receiver_id: appointment_params[:recipient_id],
				message: 'new date appointment'
				}).save
		end
	end

	def update
		decision = params[:decision]
		@appointment = Appointment.find(params[:id])
		sender_id = params[:sender]
		if decision == 'accept'
			@appointment.accepted = true;
			@appointment.save
			Notification.new({
				sender_id: current_user.id,
				receiver_id: sender_id,
				message: 'appointment accepted'
				}).save
			render json: { status: 'confirmed'}
		else
			@appointment.destroy
			render json: { status: 'cancelled'}
		end
	end

	def destroy
	end

	private

	def appointment_params
		params.require(:appointment).permit!
	end
end
