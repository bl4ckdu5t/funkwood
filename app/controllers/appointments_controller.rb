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
	end

	def destroy
	end

	private

	def appointment_params
		params.require(:appointment).permit!
	end
end
