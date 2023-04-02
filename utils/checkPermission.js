import {UnAuthenticatedError} from '../errors/index.js'

const checkPersmissions = (requestUser , resourceUserId)=>{
   if(requestUser.userId === resourceUserId.toString()) return

   throw new UnAuthenticatedError('Not authorized to edit the job')
}

export default checkPersmissions;